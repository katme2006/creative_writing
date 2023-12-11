from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import IndividualPrompt
from .serializers import IndividualPromptSerializer


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
