function changeStatus({status}) {
    event.preventDefault();
    $('#status').empty();
    $('#status').append(status)
}
// ["problem_id","time_of_call","job_title", "telephone_no", "dept", "software", "serial_no", "brand", "model", "device_type", "problem_type", "problem_desc", "notes"]
const data = [ [1,"asdad",""], [2,"a","e"], [11,"",""] ];

function search() {
    var user_input = $("#id-field").val();
    var records = [];

    for (var i = 0; i < data.length; i++) {
        var record = data[i];

        var id = record[0].toString();
        var expr =  new RegExp("^" + user_input);
        if ( expr.test(id) ) {
            records.push(record);
        }
    }

    updateTable(records);

}

function updateTable(records) {
    $("#i-table").empty();
    $("#i-table").append( "<tr> <th>problem_id</th> <th>problem_desc</th> <th>device_type</th> </tr>");

    for (var i = 0; i < records.length; i++ ) {
        var doc = "<tr> <td>" + records[i][0] + "</td> <td>" + records[i][1] + "</td> <td>" + records[i][2] + "</td> </tr>";
        $("#i-table").append(doc);
    }

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
        "                                            <label for=\"serial-no\">Serial Number:</label>\n" +
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
