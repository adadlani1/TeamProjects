
function changeStatus({status}) {
    event.preventDefault()
    $('#status').empty()
    $('#status').append(status)
}

$(document).ready(function () {
    $(".specialists").click(function () {
        const specialist_id = this.id.split("-")[1]
        $('.tasks').empty()
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

