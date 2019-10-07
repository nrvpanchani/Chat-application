
from django.contrib import admin
from django.urls import path, include

#from chat.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.api.urls', namespace='chat')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration', include('rest_auth.registration.urls'))
]
