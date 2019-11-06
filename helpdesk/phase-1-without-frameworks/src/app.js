function changeStatus({status}) {
    event.preventDefault();
    $('#status').empty();
    $('#status').append(status)
}

//finds records with similar ID
function search() {
    var user_input = $("#id-field").val();
    var records = [];

    for (var i = 0; i < data.length; i++) {
        var record = data[i];

        var id = record["problem_id"].toString();
        var expr =  new RegExp("^" + user_input);
        if ( expr.test(id) ) {
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
        "<th>Assigned To</th> </tr>");
    $("#i-table").empty()

    var keys = ["problem_id","name","dept","job","telephone","problem_desc","problem_type","sub_type","device_type","assigned"];

    for (var i = 0; i < records.length; i++ ) {
        var classname = "i-row-" + i;
        var doc = "<tr>";
        for (var j = 0; j < keys.length - 1; j++) {
            doc += " <td class='" + classname + " problem-data' onclick='setID("+ records[i]["problem_id"] +")'>" + records[i][keys[j]] + "</td>";
        }
        doc +=  "<td class=' pointer +" + classname + " problem-data' onclick='setID("+ records[i]["problem_id"] +")'>" + records[i]["assigned"] + "</td> </tr>";
        $("#i-table").append(doc);
    }

    $(".problem-data").dblclick(function(e){
        window.open("existing-issue-details.html","_self");
    });

}

//saves user-input when click a row in the table
function setID(id) {
    window.localStorage.setItem("id",id);
}

$(document).ready(function () {
    var currentID = 1;
    $(".specialists").click(function () {
        const specialist_id = this.id.split("-")[1];
        $('.tasks').empty();
        for (let i = 1; i <= $(`#${this.id}`).val(); i++)
            $(`#tasks-${specialist_id}`).append("</br><p>ID-421</p><p>Problem with printers</p>")
    });
});


$(document).ready(function () {
    var id = Math.floor(Math.random() * 1000);
    $('#problem-id').append(id);

    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear();

    if(day<10){
        var newday = "0" + day;
    }
    var date = newday + "/" + month + "/" + year;

    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var time = hours + ":" + minutes;

    var dateTime = date + " " + time;
    $('#dateTime').append(dateTime);
});

function addIssues() {
    var id = Math.floor(Math.random() * 1000);

    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear();

    if(day<10){
        var newday = "0" + day;
    }
    var date = newday + "/" + month + "/" + year;

    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var time = hours + ":" + minutes;

    var dateTime = date + " " + time;

    console.log(id);

    var issue = "<div class=\"\" id=\"heading" + id+ "\">\n" +
        "        <button class=\"accordion\" data-toggle=\"collapse\" data-target=\"#collapse" + id+ "\" aria-expanded=\"true\"\n" +
        "                aria-controls=\"collapse" + id+ "\" onclick=\"appendProblemDesc(" + id+ ")\" id=\"accordion-header" + id+ "\" >\n" +
        "            Problem Description:\n" +
        "        </button>\n" +
        "    </div>\n" +
        "\n" +
        "    <div id=\"collapse" + id+ "\" class=\"collapse show\" aria-labelledby=\"heading" + id+ "\" data-parent=\"#accordion\">\n" +
        "        <br>\n" +
        "        <div class=\"container\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-6\" style=\"text-align: center\">\n" +
        "                    <span>Problem ID: </span><label id=\"problem-id\">" + id+ "</label>\n" +
        "                </div>\n" +
        "                <div class=\"col-6\" style=\"text-align: center\"><span>Call: </span> <label id=\"dateTime\">" + dateTime + "</label>\n" +
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
        "                                    <select class=\"form-control form-size\" name=\"callerID\" id=\"callerID\">\n" +
        "                                        <option>Anmol</option>\n" +
        "                                        <option>Alice</option>\n" +
        "                                        <option>Bert</option>\n" +
        "                                        <option>Claire</option>\n" +
        "                                        <option>Kostas</option>\n" +
        "                                        <option>Ayo</option>\n" +
        "                                        <option>Sean</option>\n" +
        "                                        <option>Viraj</option>\n" +
        "                                        <option>Vishwaswaroop</option>\n" +
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
        "                                    <label for=\"software\">Software:</label>\n" +
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
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <br/>\n" +
        "                        <div class=\"container\">\n" +
        "                            <div class=\"row\">\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"device-type\">Device: </label>\n" +
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
        "                                    <label for=\"serial-no\">Serial Number:</label>\n" +
        "                                    <input class=\"form-control\" id=\"serial-no\" type=\"text\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"make\">Make:</label>\n" +
        "                                    <input class=\"form-control\" id=\"make\" type=\"text\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col-3\">\n" +
        "                                    <label for=\"model\">Model:</label>\n" +
        "                                    <input class=\"form-control\" id=\"model\" type=\"text\">\n" +
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
        "                                    <label for=\"problem-desc" + id+ "\">Problem Description:</label>\n" +
        "                                    <input class=\"form-control\" id=\"problem-desc" + id+ "\" type=\"text\">\n" +
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
        "                                <button type=\"button\" id=\"specialist-button-" + id+ "\" class=\"btn btn-dark\"\n" +
        "                                        data-toggle=\"modal\"\n" +
        "                                        data-target=\"#refer-to-specialist-modal\" onclick='saveButtonID(" + id+ ")'>\n" +
        "                                    Refer to a Specialist\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-6\">\n" +
        "                                <button type=\"button\" class=\"btn btn-dark\" data-toggle=\"modal\"\n" +
        "                                        data-target=\"#solution-provided-modal1\">Solution Provided\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <br>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";

    scroll = setInterval(function(){ window.scrollBy(0, 1000);});

    setTimeout(function(){clearInterval(scroll);}, 300);

    $("#new-issues").append(issue);
}
let currentID = 1;

function saveButtonID(id) {
    currentID = id;
}

function returnCurrentID() {
    return currentID;
}

/*  Data    */

const data = [ {
    "problem_id" : 100,
    "problem_desc" : "Windows 10 is being unresponsive",
    "problem_type": "Software",
    "sub_type" : "",
    "telephone" : "01616286485",
    "device_type" : "Laptop",
    "software" : "Windows 10",
    "brand" : "HP",
    "model" : "Pavilion",
    "serial_no" : "AC3453",
    "name" : "Alice",
    "dept" : "Management",
    "job" : "Helpdesk Operator",
    "assigned" : "",
    "time" : "02/11/2019 10:00",
    "notes" : ["Informed caller to restart device and to check if problem still persisted. 02/11/2019 10.30 - caller " +
    "called back with the same problem. Referred to Bert."]
},
    {
    "problem_id" : 2,
    "problem_desc" : "AutoCAD is being unresponsive",
    "problem_type": " Software",
    "sub_type" : "",
    "telephone" : "123456789",
    "device_type" : "Laptop",
    "software" : "AutoCAD",
    "brand" : "Lenovo",
    "model" : "X1 Carbon",
    "serial_no" : "12345",
    "name" : "Berlinia",
    "dept" : "Tech Support",
    "job" : "IT Technician",
    "assigned" : "",
    "time" : "06/11/2019 22:43",
    "notes" : ["xyz happened"]
    },
    {
    "problem_id" : 11,
    "problem_desc" : "RFID scanner does not work",
    "problem_type": "Hardware",
    "sub_type" : "",
    "telephone" : "56574839",
    "device_type" : "Scanner",
    "software" : "N/A",
    "brand" : "Samsung",
    "model" : "ScanID",
    "serial_no" : "SA940",
    "name" : "Cristiano Ronaldo",
    "dept" : "Director",
    "job" : "Sporting Director",
    "assigned" : "",
    "time" : "03/10/2019 10:32",
    "notes" : ["Told to restart device"]
    },
];
