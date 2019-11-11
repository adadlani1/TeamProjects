const Roles = [{
    username: 'alice',
    password: 'alice',
    role: 'Operator'
}, {
    username: 'bert',
    password: 'bert',
    role: 'Specialist'
}];

function makeReferButtonEnable(){
    $('#referButton').removeAttr('disabled');
  }

function disableButton(){
    document.getElementById("referButton").disabled = true
}

function unclickAllButtons(){
    $('.specialist').prop('checked', false)
}

  var user;
  const specialists = ['bertCheck','claraCheck','jimCheck','timCheck']
 function reflectSpecialist(){
    if($('.specialist').is(':checked')){
        specialists.forEach((specialist)=>{
            if($(`#${specialist}`).is(':checked')){
               // changeStatus({status:`Referred to ${specialist.toUpperCase().substring(0,specialist.length-5)}`})
               document.getElementById("status"+currentID).innerHTML = `Referred to ${specialist.toUpperCase().substring(0,specialist.length-5)}`;
            //    document.getElementById("myBtn").disabled = true
            }
        })
    }
 }

/*  Data    */

const data = [{
    "problem_id": 2,
    "problem_desc": "Windows 10 is being unresponsive",
    "problem_type": "Software",
    "sub_type": "",
    "telephone": "01616286485",
    "device_type": "Laptop",
    "software": "Windows 10",
    "brand": "HP",
    "model": "Pavilion",
    "serial_no": "AC3453",
    "name": "Alice",
    "dept": "Management",
    "job": "Helpdesk Operator",
    "specialist": "Bert",
    "time": "02/11/2019 10:00",
    "priority": "Very Important",
    "location": "",
    "notes": ["Informed caller to restart device and to check if problem still persisted. 02/11/2019 10.30 - caller " +
    "called back with the same problem. Referred to Bert."]
},
    {
        "problem_id": 11,
        "problem_desc": "AutoCAD is being unresponsive",
        "problem_type": " Software",
        "sub_type": "",
        "telephone": "123456789",
        "device_type": "Laptop",
        "software": "AutoCAD",
        "brand": "Lenovo",
        "model": "X1 Carbon",
        "serial_no": "12345",
        "name": "Berlinia",
        "dept": "Tech Support",
        "job": "IT Technician",
        "specialist": "Bert",
        "time": "06/11/2019 22:43",
        "priority": "Important",
        "location": "",
        "notes": ["xyz happened"]
    },
    {
        "problem_id": 100,
        "problem_desc": "RFID scanner does not work",
        "problem_type": "Hardware",
        "sub_type": "",
        "telephone": "56574839",
        "device_type": "Scanner",
        "software": "N/A",
        "brand": "Samsung",
        "model": "ScanID",
        "serial_no": "SA940",
        "name": "Cristiano Ronaldo",
        "dept": "Director",
        "job": "Sporting Director",
        "specialist": "",
        "time": "03/10/2019 10:32",
        "priority": "",
        "location": "",
        "notes": ["Told to restart device"]
    },
];

var user;

const jobsForClara = [{id: '324', description: 'Problem with printer'}];

const jobsForJim = [
    {id: '123', description: 'Coffee machine broke'},
    {id: '543', description: 'PC not working'},
    {id: '678', description: 'Scanner not scanning complete page'},
    {id: '989', description: 'Pen drive not recognised'}
];

const jobsForTim = [{id: '786', description: 'Wifi router broke'},
    {id: '564', description: 'Hadoop not working'},
    {id: '198', description: 'Speakers grounded'},
    {id: '875', description: 'Powerpoint not opening'},
    {id: '444', description: 'VS code crashes after adding extensions'}];

$(document).ready(function () {
    var specialistTaskObject;
    $(".specialists").click(function () {
        const specialist_id = this.id.split("-")[1];
        $('.tasks').empty();
        if (specialist_id == 2)
            specialistTaskObject = jobsForClara
        if (specialist_id == 3)
            specialistTaskObject = jobsForJim
        if (specialist_id == 4)
            specialistTaskObject = jobsForTim
        for (let i = 1; i <= $(`#${this.id}`).val(); i++)
            $(`#tasks-${specialist_id}`).append(`</br><p>ID-${specialistTaskObject[i - 1].id}</p><p>${specialistTaskObject[i - 1].description}</p>`)
    });
});

var timeZoneGlobalVar = 'UTC';

var currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();

if (day < 10) {
    var newday = "0" + day;
} else
    newday = day;
var date = newday + "/" + month + "/" + year;

var currentTime = new Date(),
    hours = currentTime.getHours(),
    minutes = currentTime.getMinutes();

if (minutes < 10) {
    minutes = "0" + minutes;
}

var time = hours + ":" + minutes;

var dateTime = date + " " + time + " " +timeZoneGlobalVar;



const employeesData = [{name: 'Select Caller', jobTitle: '', telephone: '', department: ''},
    {name: 'Anmol', jobTitle: 'Worker-1', telephone: '07828228282', department: 'department-1'},
    {name: 'Bert', jobTitle: 'Worker-2', telephone: '07262262662', department: 'department-2'},
    {name: 'Claire', jobTitle: 'Worker-3', telephone: '0764581721', department: 'department-3'},
    {name: 'Alice', jobTitle: 'Worker-4', telephone: '07648261235', department: 'department-4'},
    {name: 'Kostas', jobTitle: 'Worker-5', telephone: '0782364528', department: 'department-5'}]

function redirect() {
    setTimeout(() => {
        window.location = 'dashboard.html'
    }, 2000)
}

function fillData() {
    const caller = $('#callerID').val()
    const employeeData = employeesData.filter((employeeData) => {
        if (employeeData.name === caller)
            return true
    })
    $('#telephone').val(employeeData[0].telephone)
    $('#job-title').val(employeeData[0].jobTitle)
    $('#department').val(employeeData[0].department)

}

function validate(form) {
    event.preventDefault();
    const username = ($('#username').val());
    const password = ($('#password').val());
    console.log(username + password);
    const user = Roles.filter((role) => {
        if (role.username === username.toLowerCase().trim() && role.password === password) {
            var user = role.username
            return true
        }
    });
    if (!user.length) {
        setTimeout($('#error').css('display', 'block'), 200)
    } else {
        if (user[0].role === 'Operator')
            window.location.href = 'src/dashboard.html';
        if (user[0].role === 'Specialist')
            window.location.href = 'src/Specialist_Dashboard.html'
    }

}

$(document).ready(function () {
    $('#error').css('display', 'none');
});

// function changeStatus({status}) {
//     event.preventDefault();
//     $(`#status${id}`).append(status)
// }

//finds records with similar ID
function search() {
    var user_input = $("#id-field").val();
    var records = [];

    for (var i = 0; i < data.length; i++) {
        var record = data[i];

        var id = record["problem_id"].toString();
        var expr = new RegExp("^" + user_input);
        if (expr.test(id)) {
            records.push(record);
        }
    }

    updateTable(records);

}

//updates the table based on the given records
function updateTable(records) {
    $("#header").empty().append(
        "<tr> <th>Issue ID</th> <th>Caller</th> <th>Department</th> <th>Job</th> <th>Telephone</th>" +
        "<th> Problem Description</th>  <th>Problem Type</th> <th>Sub Problem Type</th> <th>Device Type</th>" +
        "<th>Assigned Specialist</th> </tr>");
    $("#i-table").empty()

    var keys = ["problem_id", "name", "dept", "job", "telephone", "problem_desc", "problem_type", "sub_type", "device_type", "specialist"];

    for (var i = 0; i < records.length; i++) {
        var classname = "i-row-" + i;
        var doc = "<tr>";
        for (var j = 0; j < keys.length - 1; j++) {
            doc += " <td class='" + classname + " problem-data' onclick='setID(" + records[i]["problem_id"] + ")'>" + records[i][keys[j]] + "</td>";
        }
        doc += "<td class=' pointer +" + classname + " problem-data' onclick='setID(" + records[i]["problem_id"] + ")'>" + records[i]["specialist"] + "</td> </tr>";
        $("#i-table").append(doc);
    }

    $(".problem-data").dblclick(function (e) {
        window.open("existing-issue-details.html", "_self");
    });

}

//saves user-input when click a row in the table
function setID(id) {
    window.localStorage.setItem("id", id);
}


$(document).ready(function () {
    var id = Math.floor(Math.random() * 1000);
    $('#problem-id').append(id);


    $('#dateTime').append(dateTime);
});

function collapse_all(){
	
	var x = document.getElementsByClassName("collapse show");
	for (i = 0; i < x.length; i++) {
	  x[i].className = "collapse";
	}
	
	var y = document.getElementsByClassName("accordion");
	for (i = 0; i < y.length; i++) {
	  y[i].className = "accordion collapsed";
	}
	
	var z = document.getElementsByClassName("accordion");
	for (i = 0; i < z.length; i++) {
	  z[i].setAttribute("aria-expanded", "false");
	}
	
}

function addIssues() {
	
    collapse_all();
    collapse_all();	
	
    var id = Math.floor(Math.random() * 1000);


    var issue = "<div class=\"\" id=\"heading" + id + "\">\n" +
        "        <button class=\"accordion\" data-toggle=\"collapse\" data-target=\"#collapse" + id + "\" aria-expanded=\"true\"\n" +
        "                aria-controls=\"collapse" + id + "\" onclick=\"appendProblemDesc(" + id + ")\" id=\"accordion-header" + id + "\" >\n" +
        "            Problem Description:\n" +
        "        </button>\n" +
        "    </div>\n" +
        "\n" +
        "    <div id=\"collapse" + id + "\" class=\"collapse show\" aria-labelledby=\"heading" + id + "\" data-parent=\"#accordion\">\n" +
        "        <br>\n" +
        "        <div class=\"container\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-3\" style=\"text-align: center\">\n" +
        "                    <span>Problem ID: </span><label id=\"problem-id\">" + id + "</label>\n" +
        "                </div>\n" +
        " <div class='col-3' style='text-align: center'><span>Operator: Alice </span></div>"+
        `<div class='col-3' style='text-align: center'><span>Status:` + " "+`</span><label id='status${id}'> Not yet submitted</label></div>`+ 
        "                <div class=\"col-3\" style=\"text-align: center\"><span>Call: </span> <label id=\"dateTime\">" + dateTime + "</label>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"container\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-12\">\n" +
        "                    <form id=\"issue\">\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"callerID\">Caller: </label>\n" +
        "                                    <select class=\"form-control form-size\" name=\"callerID\" id=\"callerID\" onclick='fillData()'>\n" +
        "                                        <option>Select Caller</option>"+
        "                                        <option>Anmol</option>\n" +
        "                                        <option>Alice</option>\n" +
        "                                        <option>Bert</option>\n" +
        "                                        <option>Claire</option>\n" +
        "                                        <option>Kostas</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"job-title\">Job Title:</label>\n" +
        "                                    <input class=\"form-control\" id=\"job-title\" type=\"text\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"telephone\">Telephone: </label>\n" +
        "                                    <input type=\"tel\" id=\"telephone\" class=\"form-control form-size\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"department\">Department:</label>\n" +
        "                                    <input class=\"form-control\" id=\"department\" type=\"text\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"software\">Software Name:</label>\n" +
        "                                    <select class=\"form-control\" id=\"software\">\n" +
        "                                        <option value=\"\">Software 1</option>\n" +
        "                                        <option value=\"\">Software 2</option>\n" +
        "                                        <option value=\"\">Software 3</option>\n" +
        "                                        <option value=\"\">Software 4</option>\n" +
        "                                        <option value=\"\">Software 5</option>\n" +
        "                                        <option value=\"\">Software 6</option>\n" +
        "                                        <option value=\"\">Software 7</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"software-version\">Version:</label>\n" +
        "                                    <input class=\"form-control\" id=\"software-version\" type=\"text\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"software-date\">Expiry Date:</label>\n" +
        "                                    <input class=\"form-control\" id=\"software-date\" type=\"text\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"device-type\">Device Type: </label>\n" +
        "                                    <select id=\"device-type\" class=\"form-control d-inline\">\n" +
        "                                        <option value=\"\">Laptop</option>\n" +
        "                                        <option value=\"\">PC</option>\n" +
        "                                        <option value=\"\">Macbook</option>\n" +
        "                                        <option value=\"\">iPad</option>\n" +
        "                                        <option value=\"\">Printer</option>\n" +
        "                                        <option value=\"\">Television</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"make\">Make:</label>\n" +
        "                                    <input class=\"form-control\" id=\"make\" type=\"text\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"model\">Model:</label>\n" +
        "                                    <input class=\"form-control\" id=\"model\" type=\"text\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"serial-no\">Serial Number:</label>\n" +
        "                                    <input class=\"form-control\" id=\"serial-no\" type=\"text\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-6\">\n" +
        "                                    <label for=\"problem-type\">Problem Type: </label>\n" +
        "                                    <select class=\"form-control\" id=\"problem-type\">\n" +
        "                                        <option value=\"Software 1\">Software 1</option>\n" +
        "                                        <option value=\"Software 2\">Software 2</option>\n" +
        "                                        <option value=\"Software 3\">Software 3</option>\n" +
        "                                        <option value=\"Software 4\">Software 4</option>\n" +
        "                                        <option value=\"Software 5\">Software 5</option>\n" +
        "                                        <option value=\"Software 6\">Software 6</option>\n" +
        "                                        <option value=\"Software 7\">Software 7</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-12\">\n" +
        "                                    <label for=\"problem-desc" + id + "\">Problem Description:</label>\n" +
        "                                    <input class=\"form-control\" id=\"problem-desc" + id + "\" type=\"text\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-12\">\n" +
        "                                    <label for=\"notes\">Notes:</label>\n" +
        "                                    <textarea id=\"notes\" class=\"form-control\" type=\"text\" placeholder=\"Notes\"\n" +
        "                                              style=\"height:100px\"></textarea>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                    </form>\n" +
        "                    <div class=\"container\">\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col-6\">\n" +
        "                                <button type=\"button\" id=\"specialist-button-" + id + "\" class=\"btn btn-dark\"\n" +
        "                                        data-toggle=\"modal\"\n" +
        "                                        data-target=\"#refer-to-specialist-modal\" onclick='saveButtonID(" + id + ");disableButton();unclickAllButtons()'>\n" +
        "                                    Refer to a Specialist\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-6\">\n" +
        "                                <button type=\"button\" class=\"btn btn-dark\" data-toggle=\"modal\"\n" +
        "                                        data-target=\"#solution-provided-modal1\">Provide Solution\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <br>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";

    scroll = setInterval(function () {
        window.scrollBy(0, 1000);
    });

    setTimeout(function () {
        clearInterval(scroll);
    }, 300);

    $("#new-issues").append(issue);
	
	
}

let currentID = 1;

function saveButtonID(id) {
    currentID = id;
}

function returnCurrentID() {
    return currentID;
}


function changeLanguage(flag, language, timezone) {
    document.getElementById('flag').src = "../Flags-Icon-Set/24x24/" + flag + ".png";
    document.getElementById('text1').innerText = language;
    timeZoneGlobalVar = timezone;

    if (language === 'Deutsche'){
        document.getElementById('new-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/plus-8x.png" alt="wrench">\n' +
            '                            <br />Nueves Problem';
        document.getElementById('existing-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/wrench-8x.png" alt="wrench">\n' +
            '                            <br />Bestehende Probleme';
        document.getElementById('dashboard').innerText = 'Instrumententafel';
        document.getElementById('noti-btn').innerHTML = '<img src="../open-iconic-master/png/bell-3x.png" alt="">\n' +
            '                            <br> <a style="font-size: 9pt; color: red" id="text">\n' +
            '                            Benachrichtigungen\n' +
            '                        </a>';
        document.getElementById('analysis').innerHTML = '<img src="../open-iconic-master/png/pie-chart-3x.png" alt="analyse"> <br> <a\n' +
            '                                    style="font-size: 9pt">\n' +
            '                                Analyse\n' +
            '                            </a>';
        document.getElementById('logout').innerHTML = '<img src="../open-iconic-master/png/account-logout-3x.png" alt="logout">\n' +
            '                            <br> <a\n' +
            '                                style="font-size: 9pt">\n' +
            '                            Ausloggen\n' +
            '                        </a>';
        document.getElementById('navbar-text').innerHTML = '<img src="../logo.png"\n' +
            '                                                                          alt="logo"> Make-IT-All Helpdesk'

    }

    if (language === 'English'){
        document.getElementById('new-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/plus-8x.png" alt="wrench">\n' +
            '                            <br />New Issue';
        document.getElementById('existing-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/wrench-8x.png" alt="wrench">\n' +
            '                            <br />Existing Issues';
        document.getElementById('dashboard').innerText = 'Dashboard';
        document.getElementById('noti-btn').innerHTML = '<img src="../open-iconic-master/png/bell-3x.png" alt="">\n' +
            '                            <br> <a style="font-size: 9pt; color: red" id="text">\n' +
            '                            Notifications\n' +
            '                        </a>';
        document.getElementById('analysis').innerHTML = '<img src="../open-iconic-master/png/pie-chart-3x.png" alt="analyse"> <br> <a\n' +
            '                                    style="font-size: 9pt">\n' +
            '                                Analysis\n' +
            '                            </a>';
        document.getElementById('logout').innerHTML = '<img src="../open-iconic-master/png/account-logout-3x.png" alt="logout">\n' +
            '                            <br> <a\n' +
            '                                style="font-size: 9pt">\n' +
            '                            Logout\n' +
            '                        </a>';
        document.getElementById('navbar-text').innerHTML = '<img src="../logo.png"\n' +
            '                                                                          alt="logo"> Make-IT-All Helpdesk'
    }
    if (language === '日本語'){
        document.getElementById('new-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/plus-8x.png" alt="wrench">\n' +
            '                            <br />新刊';
        document.getElementById('existing-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/wrench-8x.png" alt="wrench">\n' +
            '                            <br />既存の問題';
        document.getElementById('dashboard').innerText = 'ダッシュボード';
        document.getElementById('noti-btn').innerHTML = '<img src="../open-iconic-master/png/bell-3x.png" alt="">\n' +
            '                            <br> <a style="font-size: 9pt; color: red" id="text">\n' +
            '                            通知\n' +
            '                        </a>';
        document.getElementById('analysis').innerHTML = '<img src="../open-iconic-master/png/pie-chart-3x.png" alt="analyse"> <br> <a\n' +
            '                                    style="font-size: 9pt">\n' +
            '                                分析\n' +
            '                            </a>';
        document.getElementById('logout').innerHTML = '<img src="../open-iconic-master/png/account-logout-3x.png" alt="logout">\n' +
            '                            <br> <a\n' +
            '                                style="font-size: 9pt">\n' +
            '                            ログアウト\n' +
            '                        </a>';
        document.getElementById('navbar-text').innerHTML = '<img src="../logo.png"\n' +
            '                                                                          alt="logo">Make-IT-Allヘルプデスク'

    }


    if (language === 'عربى'){
        document.getElementById('new-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/plus-8x.png" alt="wrench">\n' +
            '                            <br />مشكلة جديدة';
        document.getElementById('existing-issue-btn').innerHTML = '<img\n' +
            '                                src="../open-iconic-master/png/wrench-8x.png" alt="wrench">\n' +
            '                            <br />القضايا الحالية';
        document.getElementById('dashboard').innerText = 'لوحة القيادة';
        document.getElementById('noti-btn').innerHTML = '<img src="../open-iconic-master/png/bell-3x.png" alt="">\n' +
            '                            <br> <a style="font-size: 9pt; color: red" id="text">\n' +
            '                            إشعارات\n' +
            '                        </a>';
        document.getElementById('analysis').innerHTML = '<img src="../open-iconic-master/png/pie-chart-3x.png" alt="analyse"> <br> <a\n' +
            '                                    style="font-size: 9pt">\n' +
            '                                تحليل\n' +
            '                            </a>';
        document.getElementById('logout').innerHTML = '<img src="../open-iconic-master/png/account-logout-3x.png" alt="logout">\n' +
            '                            <br> <a\n' +
            '                                style="font-size: 9pt">\n' +
            '                            تسجيل خروج\n' +
            '                        </a>';
        document.getElementById('navbar-text').innerHTML = '<img src="../logo.png"\n' +
            '                                                                          alt="logo"> مكتب المساعدة Make-IT-All'
    }
}


