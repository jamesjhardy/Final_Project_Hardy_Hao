//Photon Info
var photonToken = "750470ae7f3e2ef2df6bb89bcf398ae001f7ec59"
var photonID = "17002e000147373336323230"
var title = "plantProject"


//update stuff
function newPlantEvent(eventData){
  //log stuff
  console.log("data received from photon")
  let data = JSON.parse(eventData.data);
  console.log(data);

  //update garage object
  plantModel.moistureLevel = data.moistureLevel;
  plantModel.timeSinceWaterHr = data.timeSinceWaterHr;
  plantModel.timeSinceWaterMin = data.timeSinceWaterMin;
  plantModel.autoWater = data.autoWater;
  plantModel.waterInterval = data.waterInterval;
  plantModel.desiredLevel = data.desiredLevel;
  plantModel.waterLevel = data.waterLevel;

  //update state list
  plantModel.observer();
}








var plantModel = {

  //statuses
  moistureLevel: 50,
  timeSinceWaterHr: 100,
  timeSinceWaterMin: 100,
  autoWater: false,
  waterInterval: 100,
  desiredLevel: 50,
  waterLevel: 0,


  //CLOUD FUNCTIONS
  waterPlant: function(){
    //create data
    var waterData = {
      deviceId: photonID,
      name: "waterPlant",
      argument: "",
      auth: photonToken
    }
    //success/failure functions
    function onSuccess(e) { console.log("waterPlant success") }
    function onFailure(e) { console.log("waterPlant failed")
                            console.dir(e) }
    //send data
    myParticle.callFunction(waterData).then(onSuccess,onFailure)
    //update state list
    this.observer();
  },


  toggleAutoWater: function(){
    //create data
    var autoWaterData = {
      deviceId: photonID,
      name: "toggleAutoWater",
      argument: "",
      auth: photonToken
    }
    //success/failure functions
    function onSuccess(e) { console.log("toggleAutoWater success") }
    function onFailure(e) { console.log("toggleAutoWater failed")
                            console.dir(e) }
    //send data
    myParticle.callFunction(autoWaterData).then(onSuccess,onFailure)
    //update state list
    this.observer();
  },


  setWaterInterval: function(time){
    //set desired interval
    this.waterInterval = time;
    //convert to string
    sTime = time.toString(10);
    //create data
    var intervalData = {
      deviceId: photonID,
      name: "setWaterInterval",
      argument: sTime,
      auth: photonToken
    }
    //success/failure functions
    function onSuccess(e) { console.log("setWaterInterval success") }
    function onFailure(e) { console.log("setWaterInterval failed")
                            console.dir(e) }
    //send data
    myParticle.callFunction(intervalData).then(onSuccess,onFailure)
    //update state list
    this.observer();
  },


  setDesiredLevel: function(time){
    //set desired level
    this.desiredLevel = time;
    //convert to string
    sTime = time.toString(10);
    //create data
    var levelData = {
      deviceId: photonID,
      name: "setDesiredLevel",
      argument: sTime,
      auth: photonToken
    }
    //success/failure functions
    function onSuccess(e) { console.log("setDesiredLevel success") }
    function onFailure(e) { console.log("setDesiredLevel failed")
                            console.dir(e) }
    //send data
    myParticle.callFunction(levelData).then(onSuccess,onFailure)
    //update state list
    this.observer();
  },



  // HELPER FUNCTION
  observer: function(){
    //create list of states
    var thiss = this
    var StateList = {
      moistureL: thiss.moistureLevel,
      lastWaterHr: thiss.timeSinceWaterHr,
      lastWaterMin: thiss.timeSinceWaterMin,
      autoWaterT: thiss.waterInterval,
      autoMoistureL: thiss.desiredLevel,
      waterL: thiss.waterLevel
    }
    //pass state list into updater
    thiss.stateChangeListener(StateList);
  },

  //helper Function
  setStateChangeListener: function(newListener){
    this.stateChangeListener = newListener;
  },

  //set up funciton
  setup: function(){
    //CREATES NEW PARTICLE
    myParticle = new Particle();

    //IF SUBSCRIPTION IS SUCCESSFUL
    function onSuccess(stream) {
      //Event Listener for something Published
      stream.on('event', newPlantEvent)

      var data = {
           deviceId: photonID,
           name: "sendData",
           argument:"",
           auth: photonToken
      }
      console.log("get event stream success");

      //SEND A NEW EVENT, SO UI IS UPDATED WITH GARAGE'S INITIAL STATE
      myParticle.callFunction(data);
    }

    //IF SUBSCRIPTION IS UNSUCCESSFUL
    function onFailure(e) { console.log("getEventStream call failed")
                            console.dir(e) }

    // Subscribe to the stream
    myParticle.getEventStream( { name: title, auth: photonToken, deviceId: "17002e000147373336323230" }).then(onSuccess, onFailure)
  }




}
