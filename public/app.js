$(document).ready(() => {
    $.get("/scrape")
    $.getJSON("/articles", function (data) {
        for (var i = 0; i < 5; i++) {
            $(".scraped").append("<div class='col-md-12 scrapedArticles'><h3>Headline:</h3><p>"
                + data[i].headline +
                "</p><h3>Date & Summary:</h3><p>"
                + data[i].summary +
                "</p><h3>Link:</h3><a class ='link' href='"
                + data[i].link + "'>" + data[i].link +
                `</a><br><button class="btn-danger deleteOne" data_id="${data[i]._id}">Delete</button><button class='btn-danger save'>Save</button></div>`)
                
        }
    })

    $(".new").on("click", () => {
        location.reload();
    })
})
$(document).on("click", "button.deleteOne", function(event) {
    event.preventDefault();
    var id = $(this).attr("data_id");
    $.ajax("/delete/" + id, {
        type: "DELETE"

    }).then(() => {
        location.reload();
    })
    
})

$(".delete").on("click", () => {
    $.ajax({
        type: "DELETE",
        url: "/delete"
    })
    location.reload();
})