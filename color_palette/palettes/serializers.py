from rest_framework import serializers
from .models import Palette, PaletteHistory, Favorite


class PaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Palette
        fields = "__all__"


class PaletteHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaletteHistory
        fields = "__all__"


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = "__all__"
