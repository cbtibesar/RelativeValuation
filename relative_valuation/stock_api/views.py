from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Stock
import yfinance as yf
from django.shortcuts import render

# Create your views here.

def index(request):
  return HttpResponse('Hello')

def check_for_null_int(info, financial):
    if info[financial] is None:
        return -420.69
    else:
        return info[financial]


def check_for_null_string(info, financial):
    if info[financial] is None:
        return "N/A"
    else:
        return info[financial]


@method_decorator(csrf_exempt, name='dispatch')
class StocksViewSet(View):
  def post(self, request):
    t = json.loads(request.body.decode('utf-8'))
    ticker = t.get('ticker')
    info = yf.Ticker(ticker).info

    stock_data = {
        'ticker': ticker.upper(),
        'companyName': check_for_null_string(info, "shortName"),
        'sector': check_for_null_string(info, "sector"),
        'currentPrice': check_for_null_int(info, "currentPrice"),
        'marketCap': check_for_null_int(info, "marketCap"),
        'enterpriseValue': check_for_null_int(info, "enterpriseValue"),
        'forwardPE': check_for_null_int(info, "forwardPE"),
        'enterpriseToRev': check_for_null_int(info, "enterpriseToRevenue"),
        'enterpriseToEbitda': check_for_null_int(info, "enterpriseToEbitda"),
        'profitMargins': check_for_null_int(info, "profitMargins"),
        'roe': check_for_null_int(info, "returnOnEquity")
    }

    stock = Stock.objects.create(**stock_data)

    return JsonResponse(stock_data, status=201)

  def get(self, request):
    stocks = Stock.objects.all()

    stocksData = []
    for stock in stocks:
        stocksData.append({
            'ticker': stock.ticker,
            'companyName': stock.companyName,
            'sector': stock.sector,
            'currentPrice': stock.currentPrice,
            'marketCap': stock.marketCap,
            'enterpriseValue': stock.enterpriseValue,
            'forwardPE': stock.forwardPE,
            'enterpriseToRev': stock.enterpriseToRev,
            'enterpriseToEbitda': stock.enterpriseToEbitda,
            'profitMargins': stock.profitMargins,
            'roe': stock.roe
        })

    data = {
        'stocksData': stocksData
    }

    return JsonResponse(data, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class StockViewSet(View):
    def delete(self, request, ticker):
      ticker = ticker.upper()
      stock = Stock.objects.get(ticker=ticker)
      stock.delete()
      message = {'message': f'Stock {ticker} has been deleted'}
      return JsonResponse(message, status=200)
