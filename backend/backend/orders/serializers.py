from rest_framework import serializers
from .models import Order
from products.models import Product

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'total_price']

    def create(self, validated_data):
        products = validated_data.pop('products')
        total_price = sum(p.price for p in products)
        order = Order.objects.create(total_price=total_price, **validated_data)
        order.products.set(products)
        return order

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request and request.user.is_staff:
            # Allow admin to update status
            status = validated_data.get('status', instance.status)
            instance.status = status
        # Allow updating other fields if needed (add more logic if required)
        return super().update(instance, validated_data)
