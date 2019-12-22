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
                "</a><br><button class='btn-danger deleteOne'>Delete</button><button class='btn-danger save'>Save</button></div>")

        }
    })

    $(".new").on("click", () => {
        location.reload();
         $.getJSON("/articles", function (data) {
            for (var i = 0; i < 5; i++) {
                $(".scraped").append("<div class='col-md-12 scrapedArticles'><h3>Headline:</h3><p>"
                    + data[i].headline +
                    "</p><h3>Date & Summary:</h3><p>"
                    + data[i].summary +
                    "</p><h3>Link:</h3><a class ='link' href='"
                    + data[i].link + "'>" + data[i].link +
                    "</a><br><button class='btn-danger delete'>Delete</button><button class='btn-danger save'>Save</button></div>")
            }
            
        })
       
    })
})

$(".delete").on("click", () => {
    $.ajax({
        type: "GET",
        url: "/delete"
    })
    location.reload();
})

$(".deleteOne").on("click", () => {
    $.ajax({
        type: "GET",
        url: "/delete"
    })
    
})