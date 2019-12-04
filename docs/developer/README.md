#Developer README Final Project

This project is a Smart Plant Watering Device. The main hardware that need to be implemented is a moisture sensor that will detect the soil's moisture, an ultrasonic sensor to detect when the water level is too low and needs a refill, and a servo motor that will turn to add water to the plant (you can include an optional LED for initial testing).

After setting up the photon and connecting it to WiFi, connect your moisture sensor to correct pins (all wiring shown in Fritzing Diagram). The sensor updates the user interface when there is a change in moisture, so it needs to publish data to the cloud on a set interval. This is done in the readSensor() method to access the data specifically for the moisture sensor. This method returns an int of the moisture converted to a scale of 0-100%. This value is then published to the User Interface.

Next to simulate a water pump, wire up the servo to the Photon, then add an event listener to listen to when the button on the user interface is pressed. This triggers the servo to turn a certain degree. After two seconds the servo returns back to its original position simulating the water being poured into the plant. For initial testing, you can use an LED; when the light is on the water is pouring, and when it's off the servo is suppose to go back to its original position. This is done in the cloud function waterPlant(String str) that will check if the plant has been watered or not, then move the servo/ turn on the LED if the plant has not yet been watered. In this method, it starts the timer that will stop the water as well, then in the stopWater() function return the servo to it's original position/ turn off the LED.

Since in real life, it would take sometime for the water to travel through the soil of the plant, a safeguard is implemented where you cannot water the plant again until at least a minute has passed so the auto water feature doesn't flood the plant. This is done in the updateTime() where all the time is calculated and measured.

Finally, wire up the ultrasonic sensor and set the distance for when the reservoir of water is too low. Once the water is below a certain level, this signals the user interface to have an alert telling the user that the water level is too low. The alert disappears when the reservoir is filled again. This is done in the readSonic() method to implement the ultrasonic sensor. The desired distance of the reservoir is set here.

For the User Interface, you can manually water the plant from any distance with a touch of a button. In the settings, there is an auto water feature the user can turn on or off. This is done with the cloud function toggleAutoWater(String str). Here they can set the ideal moisture level for the plant and/or an automatic timer that will water the plant once the moisture level dips below the desired level, or the timer goes off. These are done with the setWaterInterval(String str) and setDesiredLevel(String str) methods. Additionally, the user should be able to know when the last time the plant watered was, as well as a reminder to fill the water once the water level gets too low.

All of the data is then published to the User Interface using the sendData() method.

There is an .ino file with all the hardware setup, cloud functions, timers, and timing logic. This will be the file you want to work on if you are adding any hardware features or timing features.

There is a .html file that controls what is displayed on the User Interface such as buttons, sliders, and other pages that are linked to the other .js files. This will be the file you want to work on if you are adding additional features for the user's experience.

There are two .js files, one that sends and receives data from the photon, and one that contains the logic and functionality of the User Interface. These files will need to be changed whenever a new feature is added either in the hardware setup or in the user interface.
