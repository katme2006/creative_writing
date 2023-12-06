from django.urls import path
from .views import UpdateUserProfileView, GetUserProfileView, PublicUserProfileView, MyProfileView

urlpatterns = [
    path('update-profile/', UpdateUserProfileView.as_view(), name='update-profile'),
    path('get-bio/', GetUserProfileView.as_view(), name='get-bio'),
    path('public-profile/<int:user_id>/', PublicUserProfileView.as_view(), name='public-profile'),
    path('my-profile/', MyProfileView.as_view(), name='my-profile'),
]
