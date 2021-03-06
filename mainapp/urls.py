from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.conf.urls import url


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apiapp.urls')),
    url(r'^.*$', TemplateView.as_view(template_name="index.html"))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
