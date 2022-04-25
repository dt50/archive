from django.shortcuts import render
from django.views.generic import ListView
from .models import Archive
from taggit.models import Tag
from django.http import JsonResponse

# Create your views here.


def is_ajax(request):
    return request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest"


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

    def get_context_data(self, **kwargs):
        context = super(TagArchiveView, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context


def search_results(request):
    if is_ajax(request):
        res = None
        game = request.POST.get('game').split(' ')

        qs = [Archive.objects.filter(tags__name__icontains=x) for x in ' '.join(game).split()]

        if len(qs) > 0 and len(game) > 0 and len(qs[0].values()) != 0:
            data = []
            for poses in qs:
                for pos in poses:
                    item = {
                        'name': pos.file.name,
                        'attributes': list(pos.tags.names()),
                        'download': str(pos.file.url)
                    }

                    if item in data:
                        continue
                    data.append(item)

                res = data
        else:
            res = 'No files found ...'

        return JsonResponse({'data': res})
    return JsonResponse({})
