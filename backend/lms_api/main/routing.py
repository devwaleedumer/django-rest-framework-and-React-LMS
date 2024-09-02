from django.urls import path, re_path
from .consumer import ChatConsumer
websocket_urlpatterns = [
     path('', ChatConsumer.as_asgi()),
]