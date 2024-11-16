from django.shortcuts import render
from .serializers import SignUpSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate


class SignUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            password = request.data.get('password')
            user.set_password(password)
            user.save()
            refresh_token = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh_token), 'access': str(refresh_token.access_token)}, status=status.HTTP_201_CREATED)
        return Response({serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        print("user", user)
        print("email", email)
        print("password", password)
        if user:
            refresh_token = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh_token), 'access': str(refresh_token.access_token)}, status=status.HTTP_200_OK)

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
