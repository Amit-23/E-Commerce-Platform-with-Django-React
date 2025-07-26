from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, UserProfile
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from orders.models import Order
from orders.serializers import OrderSerializer



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class UserDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=404)


class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return Response({"message": "Welcome to Admin Dashboard. You have admin access."})


class AdminOrdersView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        orders = Order.objects.all().order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def patch(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            new_status = request.data.get('status')
            if new_status in ['pending', 'accepted', 'shipped', 'delivered']:
                order.status = new_status
                order.save()
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            else:
                return Response({"error": "Invalid status"}, status=400)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)
