from django.urls import path
from .views import CreateWritingCollectionView, ListWritingCollectionsView

urlpatterns = [
    path('create/', CreateWritingCollectionView.as_view(), name='create_writing_collection'),
    path('collections/', ListWritingCollectionsView.as_view(), name='list-collections'),
]