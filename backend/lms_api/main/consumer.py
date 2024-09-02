from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from lms_api.main.models import Conversation
 
 
class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """
 
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None
   
    # def connect(self):
    #     print("Connected!")
    #     self.room_name = "home"
    #     self.accept()
    #     self.send_json(
    #         {
    #             "type": "welcome_message",
    #             "message": "Hey there! You've successfully connected!",
    #         }
    #     )
    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return
    
        self.accept()
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)
    
        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name,
            self.channel_name,
        )
    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)
 
    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
                from_user=self.user,
                to_user=self.get_receiver(),
                content=content["message"],
                conversation=self.conversation
            )
        return super().receive_json(content, **kwargs)
    
    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)    