from pickle import FALSE
from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, null=True)


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=False)
    reason = models.TextField()
    vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)
    is_canceled = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return self.reason + " for " + self.owner + " on " 
    # + self.date
