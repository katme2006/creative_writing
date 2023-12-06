from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'profile_picture', 'interests', 'favorite_books']
        extra_kwargs = {'profile_picture': {'required': False}}
