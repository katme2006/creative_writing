from rest_framework import serializers
from .models import WritingCollection
import re
from response_app.serializers import IndividualPromptSerializer


class WritingCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WritingCollection
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

    def validate_color(self, value):
        # Validate color field
        if value and not re.match(r'^#(?:[0-9a-fA-F]{3}){1,2}$', value):
            raise serializers.ValidationError("Invalid HEX color code.")
        return value
    

class WritingCollectionDetailSerializer(serializers.ModelSerializer):
    prompts = IndividualPromptSerializer(many=True, read_only=True, source='individualprompt_set')

    class Meta:
        model = WritingCollection
        fields = ['collection_title', 'collection_description', 'created_at', 'updated_at', 'private', 'color', 'prompts']
