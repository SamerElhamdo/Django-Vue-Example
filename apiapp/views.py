from rest_framework.response import Response
from rest_framework import generics
from . models import Posts
from . serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated

# RetrieveAPIView - used for read-only endpoints to represent a single model instance.
# https://www.django-rest-framework.org/api-guide/generic-views/#retrieveapiview
class PostsList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Posts.objects.all()
    serializer_class = PostSerializer


class PostsDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Posts.objects.all()
    serializer_class = PostSerializer


