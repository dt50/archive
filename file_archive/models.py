from django.db import models
from django.contrib.auth.models import User

from taggit.managers import TaggableManager

# Create your models here.


class Archive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    tags = TaggableManager()

    def __str__(self):
        return str(self.file)
