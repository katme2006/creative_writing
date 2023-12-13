from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import IndividualPrompt
from .serializers import IndividualPromptSerializer
from rest_framework.generics import ListAPIView
from writing_collections.models import WritingCollection

class CreateIndividualPrompt(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Deserialize the incoming data
        serializer = IndividualPromptSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new individual prompt to the database
            serializer.save(user=request.user)  # Set the user to the current user

            # Debugging line to print the serializer data
            print(serializer.data)

            # Return the serialized data in the response
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return errors if the data is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetIndividualPromptView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, prompt_id):
        try:
            individual_prompt = IndividualPrompt.objects.get(id=prompt_id, user=request.user)
            serializer = IndividualPromptSerializer(individual_prompt)
            return Response(serializer.data)
        except IndividualPrompt.DoesNotExist:
            return Response({'error': 'Individual prompt not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, prompt_id):
        try:
            individual_prompt = IndividualPrompt.objects.get(id=prompt_id, user=request.user)
            serializer = IndividualPromptSerializer(individual_prompt, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IndividualPrompt.DoesNotExist:
            return Response({'error': 'Individual prompt not found'}, status=status.HTTP_404_NOT_FOUND)

        
    def delete(self, request, prompt_id):
        try:
            individual_prompt = IndividualPrompt.objects.get(id=prompt_id, user=request.user)
            individual_prompt.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except IndividualPrompt.DoesNotExist:
            return Response({'error': 'Individual prompt not found'}, status=status.HTTP_404_NOT_FOUND)

class ListIndividualPromptsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all individual prompts for the logged-in user
        user_prompts = IndividualPrompt.objects.filter(user=request.user).order_by('-created_at')
        serializer = IndividualPromptSerializer(user_prompts, many=True)
        # Return the serialized data
        return Response(serializer.data)
    


class AddPromptToCollectionView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, prompt_id):
        user = request.user
        try:
            prompt = IndividualPrompt.objects.get(id=prompt_id, user=user)
            collection_id = request.data.get('collection_id')
            collection = WritingCollection.objects.get(id=collection_id, user=user)

            prompt.writing_collection = collection
            prompt.save()

            serializer = IndividualPromptSerializer(prompt)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except IndividualPrompt.DoesNotExist:
            return Response({'error': 'Prompt not found'}, status=status.HTTP_404_NOT_FOUND)
        except WritingCollection.DoesNotExist:
            return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)