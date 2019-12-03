//data stream info
const String title = "plantProject";

//Define constant varbles for hardware
const int sensorPower = D0;
const int sensorOutput = A0;
const int waterPin = D1;
const int servoPin = D2;
const int echoPin = D3;
const int trigPin = D4;
const int relayPin = D5;

//Data that needs to be saved
int moistureLevel = 0;
int timeSinceWaterHr = 0;
int timeSinceWaterMin = 0;
boolean autoWater = false;
int waterInterval = 10;
int desiredLevel = 50;

//timers
Timer updateTimer(1000, updateTime);
Timer stopWaterTimer(2000, stopWater, true);

//other
int timeCounter = 0;
boolean sensorChecked = false;
boolean dataSent = false;
boolean plantWatered = false;
int waterLevel = 0;

//servo stuff
Servo servo;
int servoPos = 0;



//
//  SETUP
//
void setup(){
  //start Serial
  Serial.begin(9600);
  //setup hardware
  pinMode(sensorPower, OUTPUT);
  pinMode(sensorOutput, INPUT);
  pinMode(waterPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(relayPin, OUTPUT);
  servo.attach(servoPin);
  servo.write(0);
  //cloud functions
  Particle.function("waterPlant", waterPlant);
  Particle.function("toggleAutoWater", toggleAutoWater);
  Particle.function("setWaterInterval", setWaterInterval);
  Particle.function("setDesiredLevel", setDesiredLevel);
  //function to send the data to the ui
  Particle.function("sendData", sendData);
  //timer
  updateTimer.start();
}

//
//  LOOP
//
void loop(){

  //check sensor every three secoinds
  if(timeCounter % 3 == 0 && !sensorChecked){
    readSensor();
    readSonic();
    sensorChecked = true;
  }

  //check for auto water
  if(autoWater){
    if(timeSinceWaterHr == waterInterval || moistureLevel < desiredLevel){
      waterPlant("");
      plantWatered = true;
    }
  }

  //send data every secoind
  if(!dataSent){
    sendData("");
    dataSent = true;
  }

}

//
//  READ sensor
//
int readSensor(){
  //turn on sensor
  digitalWrite(sensorPower, HIGH);
  delay(10);
  //read sensor output
  moistureLevel = analogRead(sensorOutput) / 33.0;
  //turn off sensor
  digitalWrite(sensorPower, LOW);
  //sensor checked
  sensorChecked = true;
  //return value
  return moistureLevel;
}

//
//  Read sonic
//
int readSonic(){
  //turn on sensor
  digitalWrite(trigPin, HIGH);
  delay(10);
  digitalWrite(trigPin, LOW);
  //get pulse time
  int t = pulseIn(echoPin, HIGH);
  //find distance
  waterLevel = (t * 0.034) / 2;
}

//
//  update TIME
//
void updateTime(){
  //upatetime
  timeCounter++;
  if(timeCounter == 10){
    timeSinceWaterMin++;
    plantWatered = false;   //stops you from watering too quickly
    timeCounter = 0;
  }
  if(timeSinceWaterMin == 10){
    timeSinceWaterHr++;
    timeSinceWaterMin = 0;
  }
  //sensor stuff
  sensorChecked = false;
  dataSent = false;
}

//
//  WATER PLANT
//
int waterPlant(String str){
  //check if watered recently
  if(!plantWatered){
    //reset times
    timeCounter = 0;
    timeSinceWaterHr = 0;
    timeSinceWaterMin = 0;
    digitalWrite(waterPin, HIGH);
    digitalWrite(relayPin, HIGH);
    servo.write(100);
    stopWaterTimer.start();
    plantWatered  = true;
    return 1;
  }
  return -1;
}

//
//  STOP WATER
//
void stopWater(){
  //turns off water
  digitalWrite(waterPin, LOW);
  digitalWrite(relayPin, LOW);
  servo.write(0);
}

//
//  TOGGLE AUTO WATER
//
int toggleAutoWater(String str){
  //switch auto water
  if(autoWater)
    autoWater = false;
  else
    autoWater = true;
  return 1;
}

//
//  SET WATER INTERVAL
//
int setWaterInterval(String str){
  waterInterval = str.toInt();
  return 1;
}

//
//  SET DESIRED MOISTURE LEVEL
//
int setDesiredLevel(String str){
  desiredLevel = str.toInt();
  return 1;
}

//
//  SEND DATA
//
int sendData(String str){
  //create data
  String data = "{\"moistureLevel\":\"";
  //set state
  data += moistureLevel;

  //add comma
  data += "\", \"timeSinceWaterHr\":\"";
  //add light data
  data += timeSinceWaterHr;

  //add comma
  data += "\", \"timeSinceWaterMin\":\"";
  //add light data
  data += timeSinceWaterMin;

  //add comma
  data += "\", \"autoWater\":\"";
  //add light data
  data += autoWater;

  //add comma
  data += "\", \"waterInterval\":\"";
  //add light data
  data += waterInterval;

  //add comma
  data += "\", \"desiredLevel\":\"";
  //add light data
  data += desiredLevel;

  //add comma
  data += "\", \"waterLevel\":\"";
  //add light data
  data += waterLevel;

  //end String
  data += "\"}";

  //send the data
  Particle.publish(title, data, 60, PRIVATE);
  dataSent = true;
  return 1;
}
