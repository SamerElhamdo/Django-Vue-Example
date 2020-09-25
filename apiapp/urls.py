from django.urls import path
from . views import PostsList, PostsDetail
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)

urlpatterns = [
    path('api-token/', TokenObtainPairView.as_view()),
    path('api-token-refresh/', TokenRefreshView.as_view()),
    path('api-posts/', PostsList.as_view()),
    path('api-posts/<int:pk>', PostsDetail.as_view())


]