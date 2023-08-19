from django.contrib import admin
from .models import Palette, PaletteHistory, Favorite

# Register your models here.
admin.site.register(Palette)
admin.site.register(PaletteHistory)
admin.site.register(Favorite)
