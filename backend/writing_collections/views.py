from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WritingCollection
from .serializers import WritingCollectionSerializer
from django.http import JsonResponse

class CreateWritingCollectionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = WritingCollectionSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            # Save with the current user as the owner of the writing collection
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Log the errors and the data
            print("Data received:", request.data)
            print("Errors:", serializer.errors)
            # Return a response with the error messages
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListWritingCollectionsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        collections = WritingCollection.objects.filter(user=request.user)
        serializer = WritingCollectionSerializer(collections, many=True)
        return Response(serializer.data)
    
class ListRecentCollectionsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_collections = WritingCollection.objects.filter(user=request.user).order_by('-updated_at')[:10]
        serializer = WritingCollectionSerializer(user_collections, many=True)
        return Response(serializer.data)
