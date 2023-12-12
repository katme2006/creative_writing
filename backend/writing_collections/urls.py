from django.urls import path
from .views import CreateWritingCollectionView

urlpatterns = [
    path('create/', CreateWritingCollectionView.as_view(), name='create_writing_collection'),
]