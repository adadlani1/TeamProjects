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

function changeStatus({status}){
  event.preventDefault()
  $('#status').empty()
  $('#status').append(status)
}

$(document).ready(function(){
    $(".specialists").click(function(){
      const specialist_id = this.id.split("-")[1]  
      $('.tasks').empty()
     for(let i=1;i<=$(`#${this.id}`).val();i++)
      $(`#tasks-${specialist_id}`).append("</br><p>ID-421</p><p>Problem with printers</p>")
    });
  });

function createAnotherForm(){
  alert("hello")
}

function setID(){
    document.getElementById('problemID').value = "ID-"+Math.round(Math.random()*1000)
}
