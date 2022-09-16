# **CarCar**

Team:

* Echo Yang - Sales/Inventory
* Chris Tsoi - Service/Inventory

## **Design**
<img src="/design.png"  width="926" height="481">

### Docker Network 
![Image of docker network](/images/dockerNetwork.png "Docker network")

## **How to start the application**

    1. Visit this [CarCar](https://gitlab.com/christstststs/project-beta) repository.
    2. Click the blue clone button and copy the URL under the Clone with HTTPS.
    3. Open the terminal and change(cd) to a directory where to store this application(CarCar).
    4. Type ***git clone*** and paste the URL cloned in step 2.
    5. After the application is cloned locally, change(cd) the directories into the application(CarCar) directory.
    6. Install and Open Docker Desktop
    7. In the terminal, type ***docker volume create beta-data*** to create the volumn to store the data.
    8. Type ***docker-compose build*** to build Docker image.
    9. Type ***docker-up build*** to run the cotainers.
    10. Type http://localhost:3000 in the browser, and explore the functionality of the CarCar page.

## **Functionality**
***At the navigation bar of CarCar home page, users can visit the following navigation tabs as Inventory, Service Appointments, Sales and Employees tabs to experience the funcionalites.***
  
- **Inventory** 
  - Users can create manufactuer, model and autombile. When creating a autombile, users needs to provide a VIN number that represent a specific vehicle.
  - Users can check all the manufactuers and what the models belong to in the inventory. 
  - Users can check the detail of all the automobiles including VIN number, Color, Year, Model and Manufacturer.
- **Services Appointments**
  - Schedule a new service appointment by VIN number, name of the owner, data/time reason and a technician.
  - Views all the scheduled appointments
  - Check a history appointments for an automobile by seraching the VIN number.
  - If the VIN number matches the VIN in inventory, that means the vehicle was bought from the dealership which will be considered a VIP, and a [VIP logo](/images/vip.png "Design") will be given.
- **Sales**
  - Check sales record for all the sales
  - View sales history in order to see all the sales that belong to a specific salesperson.
  - Ability to add a new customer and a salesperson to associate the sales.
  - Create a sales record by entering the price, salesperon, customers and automobile.
- **Employees**
  - Create a new technician who can associate the for an automobile.
  - Check the technicians who are enrolled.

## **Service microservice**
- *Models*
    - AutomobileVO (Value Object)
      - vin 
      - import_href
    - Technician (Entity)
      - name
      - employee_number
    - Appointment (Entity)
      - vin 
      - name of the owner
      - date/time
      - reason of the service
      - is_finished
      - is_canceled
      - technician name - It is ForeignKey of Technician model
  
The Service microservice polls data from the Inventory microservice through the AutomobileVO. AutomobileVO model in Service is polling data from Automobile model in Inventory to matche the vin numbers. If the input vin number in Appointment matches the vin number in Inventory, that means the vehicle is purchased from the dealership, and the customer should received an VIP treatment.

![](/images/Service.png)



## **Sales microservice**

The Sales Microservice contains 4 models. It uses the AutomobileVO model to pull data from the Inventory Microservice. 
We use the data from both sales and inventory microservice to show sales records including sales person’s name, employee number, customer name, vin number and sales price. We can also filter the sales history by each sales person’s name.

![](/images/Sales.png)

