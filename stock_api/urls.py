from django.urls import path
from .views import StocksViewSet, StockViewSet

urlpatterns = [
    path('', StocksViewSet.as_view()),
    path('delete-stock/<str:ticker>', StockViewSet.as_view()),
]
