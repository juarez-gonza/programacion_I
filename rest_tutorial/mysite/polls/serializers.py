from django.utils import timezone

from rest_framework import serializers

from polls.models import Question, Choice

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "pub_date", "question_text"]
        extra_kwargs = {
                "id": {"required": False},
                "pub_date": {"required": False},
            }

    def create(self, validated_data):
        return Question.objects.create(pub_date=timezone.now(), **validated_data)

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"
        extra_kwargs = {
                "id": {"required": False},
                "question": {"required": False}
            }
