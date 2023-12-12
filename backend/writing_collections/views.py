from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WritingCollection
from .serializers import WritingCollectionSerializer

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
            # If the data is not valid, return a response with the error messages
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListWritingCollectionsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        collections = WritingCollection.objects.filter(user=request.user)
        serializer = WritingCollectionSerializer(collections, many=True)
        return Response(serializer.data)
