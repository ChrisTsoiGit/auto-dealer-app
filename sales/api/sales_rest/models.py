from pyexpat import model
from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, null=True)
    vin = models.CharField(max_length=17, unique=True)
    is_sold = models.BooleanField(default=False)

    def sold(self):
        self.is_sold = True
        self.save()




class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(null=True)
    phone_number = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})


class SaleRecord(models.Model):
    price = models.IntegerField()
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_person",
        on_delete=models.PROTECT
        )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT
    )
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="sales_record",
        on_delete=models.PROTECT
        )
    
    def __str__(self):
        return f"Sale record for {self.vin}"
    
    def get_api_url(self):
        return reverse("api_record", kwargs={"pk": self.pk})

