
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
