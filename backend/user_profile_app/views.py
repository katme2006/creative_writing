from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
import bleach

class UpdateUserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)

        # Handle bio update with bleach
        bio = request.data.get('bio', '')
        allowed_tags = ['p', 'b', 'i', 'u', 'em', 'strong', 'a', 'ul', 'li', 'ol']
        allowed_attrs = {'a': ['href', 'rel']}
        clean_html_bio = bleach.clean(bio, tags=allowed_tags, attributes=allowed_attrs)
        
        # Update fields directly
        profile.bio = clean_html_bio
        if 'profile_picture' in request.FILES:
            profile.profile_picture = request.FILES['profile_picture']
        profile.interests = request.data.get('interests', profile.interests)
        profile.favorite_books = request.data.get('favorite_books', profile.favorite_books)
        profile.save()

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)

class PublicUserProfileView(APIView):
    def get(self, request, user_id, *args, **kwargs):
        try:
            profile = UserProfile.objects.get(user__id=user_id)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)

class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)
