from rest_framework import serializers
from .models import Order
from products.models import Product

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'total_price', 'status']

    def create(self, validated_data):
        user = self.context['request'].user
        products = validated_data.pop('products')
        total_price = sum(p.price for p in products)
        order = Order.objects.create(user=user, total_price=total_price, **validated_data)
        order.products.set(products)
        return order
