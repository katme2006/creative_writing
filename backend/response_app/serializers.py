from rest_framework import serializers
from .models import IndividualPrompt

class IndividualPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualPrompt
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}
