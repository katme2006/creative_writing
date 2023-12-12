from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('user_app.urls')),
    path('api/v1/user_profile/', include('user_profile_app.urls')),
    path('api/v1/generate-prompt/', include('open_ai_app.urls')),
    path('api/v1/write/', include('response_app.urls')),
    path('api/v1/writing-collection/',include('writing_collections.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)