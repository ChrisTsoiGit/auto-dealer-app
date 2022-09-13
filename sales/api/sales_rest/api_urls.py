from django.urls import path
from .api_views import (
    api_salespeople,
    api_salesperson,
    api_customers,
    api_customer,
    api_records,
    api_record,
    api_automobileVO,
    api_person_sales_records
)


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salesperson/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customer/<int:pk>/", api_customer, name="api_customer"),
    path("records/", api_records, name="api_records"),
    path("record/<int:pk>/",api_record, name="api_record"),
    path("automobilevo/",api_automobileVO, name="api_automobileVO"),
    path("personsalesrecord/<int:pk>/",api_person_sales_records, name="person_sales")
]
