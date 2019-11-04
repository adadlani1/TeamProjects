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
    $("#i-table").empty().append(
        "<tr> <th>Issue ID</th> <th>Caller</th> <th>Department</th> <th>Job</th> <th>Telephone</th>" +
        "<th> Problem Description</th>  <th>Problem Type</th> <th>Sub Problem Type</th> <th>Device Type</th>" +
        "<th>Assigned To</th> </tr>");

    var keys = ["problem_id","name","dept","job","telephone","problem_desc","problem_type","sub_type","device_type","assigned"];

    for (var i = 0; i < records.length; i++ ) {
        var classname = "i-row-" + i;
        var doc = "<tr>";
        for (var j = 0; j < keys.length - 1; j++) {
            doc += " <td class='" + classname + "'>" + records[i][keys[j]] + "</td>";
        }
        doc +=  "<td class='" + classname + "'>" + records[i]["assigned"] + "</td> </tr>";
        $("#i-table").append(doc);
    }

    $(".i-row-0").dblclick(function(){
        window.open("existing-issue-details.html","_self");
    });

}

$(document).ready(function () {
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

    var issue = "<div class=\"card\">\n" +
        "        <div class=\"card-header\" id=\"headingOne\">\n" +
        "            <h5 class=\"mb-0\">\n" +
        "                <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + id + "\" aria-expanded=\"true\"\n" +
        "                        aria-controls=\"collapse" + id + "\">\n" +
        "                    Collapsible Group Item " + id + "\n" +
        "                </button>\n" +
        "            </h5>\n" +
        "        </div>\n" +
        "\n" +
        "        <div id=\"collapse" + id + "\" class=\"collapse show\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n" +
        "            <div class=\"card-body\">\n" +
        "                <div class=\"container\">\n" +
        "                    <div class=\"row\">\n" +
        "                        <div class=\"col-4\" style=\"text-align: center\">\n" +
        "                            <span>Problem ID: </span><label id=\"problem-id\">" + id + "</label>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-4\" style=\"text-align: center\">\n" +
        "                            <span>Status: </span><label id=\"status\">Not yet submitted</label>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-4\" style=\"text-align: center\"><span>Call: "+dateTime+" </span> <label id=\"dateTime\"></label>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"container\">\n" +
        "                    <div class=\"row\">\n" +
        "                        <div class=\"col-12\">\n" +
        "                            <form id=\"issue\">\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"callerID\">Caller: </label>\n" +
        "                                            <select class=\"form-control form-size\" name=\"callerID\" id=\"callerID\">\n" +
        "                                                <option>Default Name</option>\n" +
        "                                                <option>alice</option>\n" +
        "                                                <option>bert</option>\n" +
        "                                                <option>claire</option>\n" +
        "                                                <option>Default Name</option>\n" +
        "                                                <option>Default Name</option>\n" +
        "                                            </select>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"job-title\">Job Title:</label>\n" +
        "                                            <input class=\"form-control\" id=\"job-title\" type=\"text\">\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"telephone\">Telephone: </label>\n" +
        "                                            <input type=\"tel\" id=\"telephone\" class=\"form-control form-size\">\n" +
        "                                        </div>\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"department\">Department:</label>\n" +
        "                                            <input class=\"form-control\" id=\"department\" type=\"text\">\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"software\">Software:</label>\n" +
        "                                            <select class=\"form-control\" id=\"software\">\n" +
        "                                                <option value=\"\">Software 1</option>\n" +
        "                                                <option value=\"\">Software 2</option>\n" +
        "                                                <option value=\"\">Software 3</option>\n" +
        "                                                <option value=\"\">Software 4</option>\n" +
        "                                                <option value=\"\">Software 5</option>\n" +
        "                                                <option value=\"\">Software 6</option>\n" +
        "                                                <option value=\"\">Software 7</option>\n" +
        "                                            </select>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-3\">\n" +
        "                                            <label for=\"device-type\">Device: </label>\n" +
        "                                            <select id=\"device-type\" class=\"form-control d-inline\">\n" +
        "                                                <option value=\"\">Laptop</option>\n" +
        "                                                <option value=\"\">PC</option>\n" +
        "                                                <option value=\"\">Macbook</option>\n" +
        "                                                <option value=\"\">iPad</option>\n" +
        "                                                <option value=\"\">Printer</option>\n" +
        "                                                <option value=\"\">Television</option>\n" +
        "                                            </select>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"col-3\">\n" +
        "                                            <label for=\"serial-no\">Serial Number:</label>\n" +1
        "                                            <input class=\"form-control\" id=\"serial-no\" type=\"text\">\n" +
        "                                        </div>\n" +
        "                                        <div class=\"col-3\">\n" +
        "                                            <label for=\"make\">Make:</label>\n" +
        "                                            <input class=\"form-control\" id=\"make\" type=\"text\">\n" +
        "                                        </div>\n" +
        "                                        <div class=\"col-3\">\n" +
        "                                            <label for=\"model\">Model:</label>\n" +
        "                                            <input class=\"form-control\" id=\"model\" type=\"text\">\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-6\">\n" +
        "                                            <label for=\"problem-type\">Problem Type: </label>\n" +
        "                                            <select class=\"form-control\" id=\"problem-type\">\n" +
        "                                                <option value=\"\">Software 1</option>\n" +
        "                                                <option value=\"\">Software 2</option>\n" +
        "                                                <option value=\"\">Software 3</option>\n" +
        "                                                <option value=\"\">Software 4</option>\n" +
        "                                                <option value=\"\">Software 5</option>\n" +
        "                                                <option value=\"\">Software 6</option>\n" +
        "                                                <option value=\"\">Software 7</option>\n" +
        "                                            </select>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "                                <div class=\"container\">\n" +
        "                                    <div class=\"row\">\n" +
        "                                        <div class=\"col-12\">\n" +
        "                                            <label for=\"notes\">Notes:</label>\n" +
        "                                            <textarea id=\"notes\" class=\"form-control\" type=\"text\" placeholder=\"Notes\"\n" +
        "                                                      style=\"height:100px\"></textarea>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <br/>\n" +
        "\n" +
        "\n" +
        "                            </form>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>";

    scroll = setInterval(function(){ window.scrollBy(0, 1000);});

    setTimeout(function(){clearInterval(scroll);}, 300);

    $("#new-issues").append(issue);
}


/*  Data    */

const data = [ {
    "problem_id" : 100,
    "problem_desc" : "asdad",
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
    "problem_desc" : "asdad",
    "problem_type": "",
    "sub_type" : "",
    "telephone" : "",
    "device_type" : "",
    "software" : "",
    "brand" : "",
    "model" : "",
    "serial_no" : "",
    "name" : "",
    "dept" : "",
    "job" : "",
    "assigned" : "",
    "time" : "",
    "notes" : []
    },
    {
    "problem_id" : 11,
    "problem_desc" : "asdad",
    "problem_type": "",
    "sub_type" : "",
    "telephone" : "",
    "device_type" : "",
    "software" : "",
    "brand" : "",
    "model" : "",
    "serial_no" : "",
    "name" : "",
    "dept" : "",
    "job" : "",
    "assigned" : "",
    "time" : "",
    "notes" : []
    },
];
