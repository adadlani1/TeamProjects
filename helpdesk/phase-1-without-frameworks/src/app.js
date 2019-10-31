//alert("hello");
function myDummyFunction(){
    var v = $('#call-number').val()
    alert(v)
}

//myDummyFunction()
var client = new XMLHttpRequest();
client.open('GET', '}http://localhost:63342/TeamProjects/helpdesk/phase-1-without-frameworks/src/data');
client.onreadystatechange = function() {
    alert(client.responseText);
}
client.send();



