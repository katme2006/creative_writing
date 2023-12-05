from django.shortcuts import render
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from django.contrib.auth import authenticate



# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        try:
            new_user = User.objects.create_user(**request.data)
            new_token = Token.objects.create(user=new_user)
            return Response(
                {"user": new_user.email, "token": new_token.key}, status=HTTP_201_CREATED
            )
        except Exception as e: 
            print(e)
            return Response("That didn't work.", status=HTTP_400_BAD_REQUEST)

        
class Log_in(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            user = authenticate(username = email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user = user)
                return Response(
                    {"client":user.email, "token":token.key}
                )
            return Response("That didn't work. Couldn't make token.", status = HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response("That didn't work", status = HTTP_400_BAD_REQUEST)


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})


class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    

