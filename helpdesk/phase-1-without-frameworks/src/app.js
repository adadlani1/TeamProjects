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

$(document).ready(function(){
    $(".specialists").click(function(){
      const specialist_id = this.id.split("-")[1]  
      $('.tasks').empty()
      $(`#tasks-${specialist_id}`).append("tasks".repeat( $(`#${this.id}`).val()))
    });
  });



function setID(){
    document.getElementById('problemID').value = "ID-"+Math.round(Math.random()*1000)
}
