from django.urls import path
from .views import PaletteListView, palette_list_view, login_view, create_palette_view

app_name = "palettes"

urlpatterns = [
    path("", palette_list_view, name="palette-list-view"),
    path("palettes/", PaletteListView.as_view(), name="palette-list"),
    path("login/", login_view, name="login-view"),
    path("create_palette/", create_palette_view, name="create-palette"),
]
