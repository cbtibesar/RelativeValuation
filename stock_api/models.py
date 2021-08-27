from django.db import models

class Stock(models.Model):
    ticker = models.CharField(primary_key=True, blank=True, max_length=5)
    companyName = models.CharField(max_length=50)
    sector = models.CharField(max_length=50)
    currentPrice = models.FloatField()
    marketCap = models.FloatField()
    enterpriseValue = models.FloatField()
    forwardPE = models.FloatField()
    enterpriseToRev = models.FloatField()
    enterpriseToEbitda = models.FloatField()
    profitMargins = models.FloatField()
    roe = models.FloatField()

    def __str__(self):
        return self.ticker
