from django.urls import path
from .views import ArchiveView, TagArchiveView, search_results

app_name = 'archive'

urlpatterns = [
    path('archive/', ArchiveView.as_view(), name='archive_list'),
    path('archive/<slug:slug>/', TagArchiveView.as_view(), name='tag_archive_list'),
    path('search/', search_results, name='search'),
]