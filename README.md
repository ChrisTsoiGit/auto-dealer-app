# **CarCar**

Team:

* Echo Yang - Sales/Inventory
* Chris Tsoi - Service/Inventory

## **Design**

![Image of model design](/design.png "Design")

### Docker Network 
![Image of docker network](/dockerNetwork.png "Docker network")

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
- ***At the navigation bar of CarCar home page, include the following: Inventory, Service Appointments, Sales, Employees***
  
- Inventory 
  - Users can create manufactuer, model and autombile. When creating a autombile, users needs to provide a VIN number that represent a specific vehicle.
  - Users can check all the manufactuers and what the models belong to in the inventory. 
  - Users can check the detail of all the automobiles including VIN number, Color, Year, Model and Manufacturer.
- Services Appointments
  - Schedule a new service appointment by VIN number, name of the owner, data/time reason and a technician.
  - Views all the scheduled appointments
  - Check a history appointments for an automobile by seraching the VIN number.
  - If the VIN number matches the VIN in inventory, that means the vehicle was bought from the dealership which will be considered a VIP, and a VIP logo <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg> will be given.
- Sales
  - Check sales record for all the sales
  - View sales history in order to see all the sales that belong to a specific salesperson.
  - Ability to add a new customer and a salesperson to associate the sales.
  - Create a sales record by entering the price, salesperon, customers and automobile.
- Employees
  - Create a new technician who can associate the for an automobile.
  - Check the technicians who are enrolled.

## **Service microservice**


## **Sales microservice**

Explain your models and integration with the inventory
microservice, here.

