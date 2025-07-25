# products/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProductViewSet, CategoryViewSet

router = DefaultRouter()
router.register('', ProductViewSet, basename='product')  # Now available at /api/products/
router.register('categories', CategoryViewSet, basename='category')  # /api/products/categories/

urlpatterns = [
    path('', include(router.urls)),
]
