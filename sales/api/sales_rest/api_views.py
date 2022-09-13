from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, SaleRecord, SalesPerson, Customer

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href", "id"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_number", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number", "id"]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = ["price", "sales_person", "customer", "vin", "id"]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "vin": AutomobileVOEncoder()
    }


@require_http_methods(["GET", "DELETE", "PUT"])
def api_automobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.filter(is_sold=False)
        return JsonResponse(
                {"automobiles": automobiles},
                encoder=AutomobileVOEncoder,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_person_sales_records(request, pk):
    if request.method == "GET":
        try:
            records = SaleRecord.objects.filter(sales_person=pk)
            return JsonResponse(
                {"records":records},
                encoder=SaleRecordEncoder
            )
        except:
            return JsonResponse({"message": "Invalid input" }, status=400)


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": people},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        try: 
            person = SalesPerson.objects.create(**content)
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False
                )
        except:
            return JsonResponse({"message": "Invalid employee number"}, status=422)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, pk):
    if request.method == "GET":
        try:
            person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Invalid sales person id"}, status=404)
    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            person = SalesPerson.objects.get(id=pk)
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales Person Does not exist"}, status=404)
        try:
            SalesPerson.objects.filter(id=pk).update(**content)
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse({"message": "Invalid employee number"}, status=422) 


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers =  Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Invalid phone number"}, status=422)
        

@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid customer id"}, status=404)
    elif request.method == "DELETE":
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count>0})
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)
        try:
            Customer.objects.filter(id=pk).update(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Invalid phone number"}, status=422)


@require_http_methods(["GET", "POST"])
def api_records(request):
    if request.method == "GET":
        records = SaleRecord.objects.all()
        return JsonResponse(
            {"sales_records": records},
            encoder=SaleRecordEncoder,
        )
    else:
        content = json.loads(request.body)
        # try to use for loop [salesperson, customer, automobileVO]?
        try:  
            employee_number = content["sales_person"]
            sales_person = SalesPerson.objects.get(employee_number=employee_number)
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales person does not exist"}, status=404)
        try:
            phone_number = content["customer"]
            customer = Customer.objects.get(phone_number=phone_number)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)
        try:
            vin_number = content["vin"]
            automobile = AutomobileVO.objects.get(vin=vin_number)
            automobile.sold()
            content["vin"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid VIN number input"}, status=422)
        try:
            record = SaleRecord.objects.create(**content)
            return JsonResponse(
                record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Invalid input"}, status=400)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_record(request, pk):
    if request.method == "GET":
        try:
            record = SaleRecord.objects.get(id=pk)
            return JsonResponse(
                record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except SaleRecord.DoesNotExist:
            return JsonResponse({"message": "Invalid record id"}, status=404)
    elif request.method == "DELETE":
        count, _ = SaleRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0})
    else:
        content = json.loads(request.body)
        try:
            record = SaleRecord.objects.get(id=pk)
        except SaleRecord.DoesNotExist:
            return JsonResponse({"message": "Sale record does not exist"}, status=404)
        if "sales_person" in content:
            try:  
                employee_number = content["sales_person"]
                sales_person = SalesPerson.objects.get(employee_number=employee_number)
                content["sales_person"] = sales_person
            except SalesPerson.DoesNotExist:
                return JsonResponse({"message": "Sales person does not exist"}, status=404)
        if "customer" in content:
            try:
                phone_number = content["customer"]
                customer = Customer.objects.get(phone_number=phone_number)
                content["customer"] = customer
            except Customer.DoesNotExist:
                return JsonResponse({"message": "Customer does not exist"}, status=404)
        if "vin" in content:
            try:
                vin_number = content["vin"]
                vin = AutomobileVO.objects.get(vin=vin_number)
                content["vin"] = vin
            except AutomobileVO.DoesNotExist:
                return JsonResponse({"message": "Invalid VIN number input"}, status=422)
        try:
            SaleRecord.objects.filter(id=pk).update(**content)
            return JsonResponse(
                record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Invalid input"}, status=400)
