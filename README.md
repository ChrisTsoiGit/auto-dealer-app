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
- At the navigation bar of CarCar home page, include the following: Inventory, Service Appointments, Sales, Employees
  
- Inventory 
  - Users can create manufactuer, model and autombile. When creating a autombile, users needs to provide a VIN number that represent a specific vehicle.
  - Users can check all the manufactuers and what the models belong to in the inventory. 
  - Users can check the detail of all the automobiles including VIN number, Color, Year, Model and Manufacturer.

- Sales
- Services Appointments
- Employees
  - Create a new technician who can associate the for an automobile.
  - 

## **Service microservice**


## **Sales microservice**

Explain your models and integration with the inventory
microservice, here.

