import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from users.models import User
from orders.models import Order


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get user from scope
        self.user = self.scope["user"]
        
        if self.user.is_anonymous:
            await self.close()
            return
        
        # Create a unique group name for this user
        self.user_group_name = f"user_{self.user.id}"
        
        # Join the user's group
        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        
        await self.accept()
        
        # Send a connection confirmation
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'Connected to notifications'
        }))

    async def disconnect(self, close_code):
        # Leave the user's group
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Handle any messages from the client (if needed)
        pass

    async def order_status_update(self, event):
        """
        Send order status update to the user
        """
        await self.send(text_data=json.dumps({
            'type': 'order_status_update',
            'order_id': event['order_id'],
            'status': event['status'],
            'message': f'Your order #{event["order_id"]} status has been updated to {event["status"]}'
        }))

    async def order_created(self, event):
        """
        Send order creation notification to admin
        """
        await self.send(text_data=json.dumps({
            'type': 'order_created',
            'order_id': event['order_id'],
            'message': f'New order #{event["order_id"]} has been placed'
        })) 