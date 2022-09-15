from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Technician, Appointment

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "owner",
        "date",
        "reason",
        "vip",
        "is_finished",
        "is_canceled",
        "id",
        "technician",
    ]
    encoders = {"technician": TechnicianEncoder()}

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):   
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            employee_number = content["technician"]
            technician = Technician.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=422,
            ) 
        try:
            vin = content["vin"]
            vip = AutomobileVO.objects.get(vin=vin)
            content["vip"] = True  
        except AutomobileVO.DoesNotExist:
            print("Not a VIP ")
        try:      
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )    
        except:
            return JsonResponse(
                {"message": "Invalid input"},
                status=400,
            )   


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid appointment id"},
                status=404,
            )    
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})   
    else: 
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=pk)
        except Appointment.DoesNotExist: 
            return JsonResponse(
                {"message": "Invalid appointment id"},
                status=404,
            )    
        if "technician" in content:
            try:
                employee_number = content["technician"]
                technician = Technician.objects.get(employee_number=employee_number)
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid employee number"},
                    status=422,
                )
        try:
            Appointment.objects.filter(id=pk).update(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid input"},
                status=400,
            )



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )     
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=422,
            )    


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )    
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0}) 
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=pk)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )
        try:   
            Technician.objects.filter(id=pk).update(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid input"},
                status=400,
            )


