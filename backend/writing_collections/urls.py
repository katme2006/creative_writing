from django.urls import path
from .views import CreateWritingCollectionView, ListWritingCollectionsView, ListRecentCollectionsView, WritingCollectionDetailView

urlpatterns = [
    path('create/', CreateWritingCollectionView.as_view(), name='create_writing_collection'),
    path('collections/', ListWritingCollectionsView.as_view(), name='list-collections'),
    path('collections/recent/', ListRecentCollectionsView.as_view(), name='list-recent-collections'),
    path('collection/<int:collection_id>/', WritingCollectionDetailView.as_view(), name='collection-detail'),
]