from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from orders.models import Order


@receiver(post_save, sender=Order)
def order_notification(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    
    if created:
        # New order created - notify admin
        async_to_sync(channel_layer.group_send)(
            "admin_notifications",
            {
                "type": "order_created",
                "order_id": instance.id,
            }
        )
    else:
        # Order status updated - notify the user who placed the order
        async_to_sync(channel_layer.group_send)(
            f"user_{instance.user.id}",
            {
                "type": "order_status_update",
                "order_id": instance.id,
                "status": instance.status,
            }
        ) 