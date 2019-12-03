#Developer README Final Project

This project is a Smart Plant Watering Device. The main hardware is a moisture sensor that will detect the soil's moisture, an ultrasonic sensor to detect when the water level is too low and needs a refill, and a servo motor that will turn to add water to the plant (you can include an optional LED for initial testing).

For the User Interface, you can manually water the plant from any distance with a touch of a button. In the settings, there is an auto water feature the user can turn on or off. Here they can set the ideal moisture level for the plant and/or an automatic timer that will water the plant once the moisture level dips below the desired level, or the timer goes off. Additionally, the user should be able to know when the last time the plant watered was, as well as a reminder to fill the water once the water level gets too low.

There is an .ino file with all the hardware setup, cloud functions, timers, and timing logic. This will be the file you want to work on if you are adding any hardware features or timing features.

There is a .html file that controls what is displayed on the User Interface such as buttons, sliders, and other pages that are linked to the other .js files. This will be the file you want to work on if you are adding additional features for the user's experience.

There are two .js files, one that sends and receives data from the photon, and one that contains the logic and functionality of the User Interface. These files will need to be changed whenever a new feature is added either in the hardware setup or in the user interface.
