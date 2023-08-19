from django.contrib.auth.models import User
from django.db import models


class Palette(models.Model):
    name = models.CharField(max_length=255)
    dominant_colors = models.JSONField()
    accent_colors = models.JSONField()
    is_public = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class PaletteHistory(models.Model):
    palette = models.ForeignKey(Palette, on_delete=models.CASCADE)
    modified_at = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    palette = models.ForeignKey(Palette, on_delete=models.CASCADE)
