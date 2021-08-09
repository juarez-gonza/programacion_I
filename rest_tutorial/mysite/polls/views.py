from django.shortcuts import render, get_object_or_404

#from django.http import HttpResponse, HttpResponseRedirect
#from django.http import Http404

from django.urls import reverse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer
from .forms import QuestionForm, ChoiceForm

# Create your views here.

# ===============QUESTION STUFF===============
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

@api_view(["POST"])
def create(request):
    q_serializer = QuestionSerializer(data=request.data)
    if q_serializer.is_valid():
        q_serializer.save()
        return Response(q_serializer.data, status=201)
    return Response({
            "error_message": "You didn't input a proper question",
            **q_serializer.data,
    }, status=400)

@api_view(["DELETE"])
def delete(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    question.delete()
    return Response(status=200)

# ===============OPTION STUFF===============
@api_view(["POST"])
def add_choice(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    c_serializer = ChoiceSerializer(data=request.data)
    if c_serializer.is_valid():
        question.add_choice(c_serializer.validated_data["choice_text"])
        return Response(c_serializer.data, status=201)
    return Response({
        "choice": c_serializer.data,
        "error_message": "That's not a valid input for a choice",
    }, status=400)

@api_view(["DELETE"])
def delete_choice(request, choice_id):
    choice = get_object_or_404(Choice, pk=choice_id)
    choice.delete()
    return Response(status=200)

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
