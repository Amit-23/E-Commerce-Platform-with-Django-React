# main urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/products/', include('products.urls')),  # now this leads to /api/products/ and /api/products/categories/
    path('api/orders/', include('orders.urls')),
]
