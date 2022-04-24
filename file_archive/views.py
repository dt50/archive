from django.shortcuts import render
from django.views.generic import ListView
from .models import Archive
from taggit.models import Tag

# Create your views here.


class ArchiveView(ListView):
    model = Archive
    template_name = 'file_archive/archive_list.html'
    context_object_name = 'archives'

    def get_context_data(self, **kwargs):
        context = super(ArchiveView, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context


class TagArchiveView(ListView):
    model = Archive
    template_name = 'file_archive/archive_list.html'
    context_object_name = 'archives'

    def get_queryset(self):
        return Archive.objects.filter(tags__slug=self.kwargs.get('slug'))


def main_view(request):
    return render(request, 'file_archive/main.html', {})


def game_detail_view(request, pk):
    pass


def search_results(request):
    pass
