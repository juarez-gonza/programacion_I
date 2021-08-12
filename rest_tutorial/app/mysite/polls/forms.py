from django import forms

from .models import Question, Choice

class QuestionForm(forms.Form):
    question_text = forms.CharField(
            label="Your Question",
            max_length=Question.question_text.field.max_length,
            min_length=4,
        )

class ChoiceForm(forms.Form):
    choice_text = forms.CharField(
            label="New Choice",
            max_length=Choice.choice_text.field.max_length,
            min_length=1,
        )
