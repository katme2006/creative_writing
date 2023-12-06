from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import UserProfileSerializer
import bleach

class UpdateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            raw_html_bio = serializer.validated_data.get('bio', '')

            allowed_tags = ['p', 'b', 'i', 'u', 'em', 'strong', 'a', 'ul', 'li', 'ol']
            allowed_attrs = {'a': ['href', 'rel']}

            clean_html_bio = bleach.clean(raw_html_bio, tags=allowed_tags, attributes=allowed_attrs)

            profile.bio = clean_html_bio
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
            return Response({'bio': profile.bio})
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)

class PublicUserProfileView(APIView):
    # This view does not require authentication
    # You can add additional permission classes if needed

    def get(self, request, user_id, *args, **kwargs):
        try:
            profile = UserProfile.objects.get(user__id=user_id)
            return Response({'bio': profile.bio})
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)
