# Final_Project_Hardy_Hao

## Subdirectories:

* src : This contains the source code for the photon
  * PlantController.ino : This file is the code running on the photon

* ui : This folder contains the code needed to create the user interface
  * rescources : This folder contains the files that allow the ui to connect to the photon
  * Plant.js : This file sends and receives data to and from the Photon
  * PlantApp.html :  This file contains the code for the structure of the user interface
  * PlantApp.js : This file contains the code to handle the function of the ui
  * styles.css : This file contains the code that determines the style of the ui

## Main Project Functions

* The project can measure the moisture level of the soil around the plant using a soil moisture sensor, and display this information on the ui
* The project can keep track of the time since the plant was last watered and display this information on the ui
* The project can keep track of the water level in the reservoir using an ultrasonic sensor, and display a warning on the ui when it is too low
* The project can release water from a reservoir onto the plant, using a servo, manually from a button on the ui

## Advanced Project Functions

* The project can be set to automatically water the plant after a certain amount of time, or if the moisture level gets too low, using a switch on the ui
* The project can be used to set the desired time that the project waits before automatically watering the plant
* The project can be used to set the desired moisture level that if the sensor reading goes below, the plant will be automatically watered
