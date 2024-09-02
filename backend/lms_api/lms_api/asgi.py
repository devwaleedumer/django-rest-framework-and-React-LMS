"""
ASGI config for lms_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_api.settings')

application = get_asgi_application()


# Import websocket application here, so apps from django_application are loaded first
 
# from channels.routing import ProtocolTypeRouter, URLRouter  # noqa isort:skip
 
 
# application = ProtocolTypeRouter(
#     {
#         "http": get_asgi_application(),
#         "websocket": URLRouter(websocket_urlpatterns),
#     }
# )