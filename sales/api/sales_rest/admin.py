from django.contrib import admin
from .models import SalesPerson,Customer,SaleRecord

# Register your models here.
admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(SaleRecord)