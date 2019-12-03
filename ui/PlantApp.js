//navigation buttons
var controls = document.getElementById("controls")
var advanced = document.getElementById("advanced")


//displau controls
function showControls(event){
  controls.hidden = false;
  advanced.hidden = true;
}

// SHOW settings
function showAdvanced(event){
  controls.hidden = true;
  advanced.hidden = false;
}


// UPDATE THE UI
function updateUI(StateList){
  //log update
  console.log("UI updated")

  //hide or show warning
  if(StateList.waterL >= 10)
    document.getElementById("lowWater").hidden = false;
  else
    document.getElementById("lowWater").hidden = true;

  //update moisture level
  document.getElementById('MoistureLevel').innerHTML = "Moisture Level: " + StateList.moistureL + "%";

  //update time since last water
  document.getElementById('LastWaterTime').innerHTML = "Last Water: " + StateList.lastWaterHr + "hrs " + StateList.lastWaterMin + "mins ago";

  //update Auto water interval
  document.getElementById('autoWaterTime').innerHTML = StateList.autoWaterT + " hrs";

  //update auto moisture level
  document.getElementById('autoMoistureLevel').innerHTML = StateList.autoMoistureL + "%";
}


// ADD EVENT LISTENER
document.addEventListener("DOMContentLoaded", function(event){
  // SHOW LOGIN SCREEN
  showControls();
  //ADD EVENT LISTENERS for navigation
  document.getElementById('settingsButton').addEventListener("click", showAdvanced)
  document.getElementById('controlsButton').addEventListener("click", showControls)
  //ADD EVENT LISTNEERS for other functions
  document.getElementById('waterButton').addEventListener("click", function(){plantModel.waterPlant();})
  document.getElementById('autoWater').addEventListener("click", function(){plantModel.toggleAutoWater();})
  document.getElementById('autoWaterRange').addEventListener("change", function(){plantModel.setWaterInterval(autoWaterRange.value);})
  document.getElementById('autoMoistureRange').addEventListener("change", function(){plantModel.setDesiredLevel(autoMoistureRange.value);})
  //set state update LISTENERS
  plantModel.setStateChangeListener(updateUI);
  plantModel.setup();
})
