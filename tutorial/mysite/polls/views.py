from django.shortcuts import render, get_object_or_404

from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404

from django.urls import reverse

from django.utils import timezone

from .models import Question, Choice
from .forms import QuestionForm, ChoiceForm

# Create your views here.

# ===============QUESTION STUFF===============
def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {
        "latest_question_list": latest_question_list,
    }
    return render(request, "polls/index.html", context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {
        "question": question,
    }
    return render(request, "polls/detail.html", context)

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {
        "question": question,
    }
    return render(request, "polls/results.html", context)

def create(request):
    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            question = Question(
                    question_text=form.cleaned_data["question_text"],
                    pub_date=timezone.now()
                )
            question.save()
            return HttpResponseRedirect(reverse("polls:index"))

        return render(request, "polls/create.html", {
                "error_message": "You didn't input a proper question",
                "form": form,
        })

    return render(request, "polls/create.html", {
        "form": QuestionForm(),
    })

def delete(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.method == "POST":
        question.delete()
        return HttpResponseRedirect(reverse("polls:index"))
    context = {
            "question": question,
        }
    raise Http404("Non valid method for this url")

# ===============OPTION STUFF===============
def add_choice(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.method == "POST":
        form = ChoiceForm(request.POST)
        if form.is_valid():
            question.choice_set.create(
                    choice_text=form.cleaned_data["choice_text"],
                    votes=0
                )
            return HttpResponseRedirect(reverse("polls:detail", args=(question.id,)))
        return render(request, "polls/add_choice.html", {
            "question": question,
            "error_message": "That's not a valid input for a choice",
        })

    return render(request, "polls/add_choice.html", {
        "question": question,
        "form": ChoiceForm(),
    })

def delete_choice(request, choice_id):
    # the usage of nested forms (choice form inside voting form) cause request.method == "GET"
    # instead of POST or DELETE.
    # this is fine for this example but some alternative should be used if static web page
    # is to be used in production.
    choice = get_object_or_404(Choice, pk=choice_id)
    choice.delete()
    return HttpResponseRedirect(reverse("polls:detail", args=(choice.question.id,)))

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        return render(request, "polls/detail.html", {
            "question": question,
            "error_message": "You didn't select a choice",
        })
    selected_choice.votes += 1
    selected_choice.save()
    return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
