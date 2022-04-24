from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter('tags_name_href')
def tags_name(tags):
    result = []
    for tag in tags:
        href = mark_safe(f"<a href='http://localhost:8000/files/archive/{tag.slug}/'>{tag.name}</a>")
        result.append(href)

    return ', '.join(result)
