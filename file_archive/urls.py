from django.urls import path
from .views import ArchiveView, TagArchiveView, main, game_detail_view, search_results

app_name = 'archive'

urlpatterns = [
    path('archive/', ArchiveView.as_view(), name='archive_list'),
    path('archive/<slug:slug>/', TagArchiveView.as_view(), name='tag_archive_list'),
    path('test/', main, name='main'),
    path('search/', search_results, name='search'),
]