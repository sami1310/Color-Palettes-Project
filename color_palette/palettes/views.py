from rest_framework import generics, filters, permissions, status
from .models import Palette
from rest_framework.response import Response
from .serializers import PaletteSerializer
from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response


def palette_list_view(request):
    palettes = Palette.objects.filter(is_public=True)
    return render(request, "palette_list.html", {"palettes": palettes})


class PaletteListView(generics.ListCreateAPIView):
    serializer_class = PaletteSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Specify the fields on which ordering can be applied
    ordering_fields = ["name", "is_public", "user__username"]
    ordering = ["name"]  # Default ordering

    # Override the get_queryset to support custom search on colors
    def get_queryset(self):
        query = self.request.query_params.get("search", None)
        if query:
            return Palette.objects.filter(
                Q(is_public=True)
                & (
                    Q(name__icontains=query)
                    | Q(dominant_colors__icontains=query)
                    | Q(accent_colors__icontains=query)
                )
            )
        return Palette.objects.filter(is_public=True)

    # Override the method to save the logged-in user as the palette's owner.
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user if self.request.user.is_authenticated else None
        )


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    else:
        return Response(
            {"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST
        )
