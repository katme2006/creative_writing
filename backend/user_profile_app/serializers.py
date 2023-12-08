from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['bio', 'profile_picture', 'interests', 'favorite_books']
        extra_kwargs = {'profile_picture': {'required': False}}
    
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture and request is not None:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None
