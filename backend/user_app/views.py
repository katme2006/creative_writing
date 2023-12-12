from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from user_profile_app.models import UserProfile  # Import the UserProfile model
from writing_collections.models import WritingCollection  # Import the WritingCollection model

User = get_user_model()

class Sign_Up(APIView):
    def post(self, request):
        try:
            new_user = User.objects.create_user(**request.data)
            new_token = Token.objects.create(user=new_user)

            # Create a user profile instance for the new user
            UserProfile.objects.create(user=new_user)

            # Create a default "Favorites" WritingCollection instance for the new user
            WritingCollection.objects.create(
                user=new_user,
                collection_title='Favorites',
                collection_description='My favorite writings',
                color='#FFFF00'  # Hex code for yellow
            )

            return Response(
                {"user": new_user.email, "token": new_token.key}, status=status.HTTP_201_CREATED
            )
        except Exception as e: 
            print(e)
            return Response("An error occurred during sign up.", status=status.HTTP_400_BAD_REQUEST)

# ... rest of your views ...
class Log_in(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            user = authenticate(username=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response(
                    {"client": user.email, "token": token.key}
                )
            return Response("Login failed. Invalid credentials.", status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response("An error occurred during login.", status=status.HTTP_400_BAD_REQUEST)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
