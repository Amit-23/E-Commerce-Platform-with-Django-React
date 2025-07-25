from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import User, UserProfile
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class UserDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return Response({"msg": "Admin Dashboard Access"})
