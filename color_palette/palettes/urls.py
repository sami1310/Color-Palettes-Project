from django.urls import path
from .views import PaletteListView, palette_list_view

app_name = "palettes"

urlpatterns = [
    path("list/", palette_list_view, name="palette-list-view"),
    path("palettes/", PaletteListView.as_view(), name="palette-list"),
]
