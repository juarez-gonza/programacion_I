from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.utils import timezone

from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer
from .forms import QuestionForm, ChoiceForm

# Create your views here.

######### GET #########
@api_view(["GET"])
def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    q_serializer = QuestionSerializer(latest_question_list, many=True)
    return Response(q_serializer.data, status=200)

@api_view(["GET"])
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    q_serializer = QuestionSerializer(question)
    c_serializer = ChoiceSerializer(question.choice_set.all(), many=True)
    res_body = {
            "choices": c_serializer.data,
            "question": q_serializer.data
            }
    return Response(res_body, status=200)

######### POST #########
@api_view(["POST"])
def create(request):
    q_serializer = QuestionSerializer(data=request.data)
    if q_serializer.is_valid():
        question = Question(
                question_text=q_serializer.validated_data["question_text"],
                pub_date=timezone.now()
                )
        question.save()
        add_choices(question, request.data)
        return Response(q_serializer.validated_data, status=201)
    return Response({
            "error_message": "You didn't input a proper question",
            **q_serializer.data,
    }, status=400)

def add_choices(question, validated_data):
    if "choices" in validated_data and len(validated_data["choices"]) > 0:
            for c in validated_data["choices"]:
                question.add_choice(c["choice_text"])

######### PUT #########
@api_view(["PUT"])
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.data["choice"])
    except (KeyError, Choice.DoesNotExist):
        return Response({
            "error_message": "Choice does not exist",
            }, status=404)
    selected_choice.vote()
    selected_choice.save()
    c_serializer = ChoiceSerializer(selected_choice)
    return Response(c_serializer.data, status=200)

######### DELETE #########
@api_view(["DELETE"])
def delete(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    question.delete()
    return Response(status=200)
