// ["problem_id","time_of_call","job_title", "telephone_no", "dept", "software", "serial_no", "brand", "model", "device_type", "problem_type", "problem_desc", "notes"]

const data = [ {

    "problem_id" : 1,
    "problem_desc" : "asdad",
    "problem_type": "",
    "sub_type" : "",
    "telephone_no" : "",
    "device_type" : "",
    "software" : "",
    "brand" : "",
    "model" : "",
    "serial_no" : "",
    "name" : "",
    "dept" : "",
    "assigned" : "",
    "time" : "",
    "notes" : []

},
];

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
