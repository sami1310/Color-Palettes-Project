from django.urls import path
from .views import PaletteListView

app_name = "palettes"

urlpatterns = [
    path("palettes/", PaletteListView.as_view(), name="palette-list"),
    # path('palettes/<int:pk>/', PaletteDetailView.as_view(), name='palette-detail'),
]
