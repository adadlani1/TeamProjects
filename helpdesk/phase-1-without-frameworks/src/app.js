function myDummyFunction(){
   const caller = $('#caller-name').val();
   if(caller==='Ben'){
  setDepartmentAndCall("Comp Sci and AI","3345")
  setID()
   }

   if(caller==='Kostas'){
    setDepartmentAndCall("Comp Sci","2781")
    setID()
   }

   if(caller==='Ayo'){
    setDepartmentAndCall("Comp Sci","1236")
    setID()
   }
}

function setDepartmentAndCall(department,call){
    document.getElementById('department').value = department
    document.getElementById('extNumber').value = call
}

function toggleSpecialistButton(command){
    document.getElementById("specialist-button").disabled = command.command
}

function setID(){
    document.getElementById('problemID').value = "ID-"+Math.round(Math.random()*1000)
}
