const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("./models")
const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI);


app.get("/scrape", () => {
    axios.get("https://www.npr.org/sections/news/").then(response => {
        const $ = cheerio.load(response.data);
       
        $("article.item").each((i, element) => {
            var result = {};

            result.headline = $(element)
                .children(".item-info-wrap")
                .children(".item-info")
                .children("h2")
                .children("a")
                .text();
            result.summary = $(element)
                .children(".item-info-wrap")
                .children(".item-info")
                .children("p")
                .children("a")
                .text();
            result.link = $(element)
                .children(".item-info-wrap")
                .children(".item-info")
                .children("h2")
                .children("a")
                .attr("href");
                db.Article.create(result);
            });
       });
});

app.get("/articles", (req, res) => {
    db.Article.find().sort({_id:-1}).then((dbArticle) => {
        res.json(dbArticle);
    });
});

app.get("/delete", (req, res) => {
    db.Article.remove({}, (response) => {
     res.send(response)
    });
});


app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(dbArticle => {
        res.json(dbArticle)
    });
});

app.post("/articles/:id", (req, res) => {
    db.Note.create(req.body).then(dbNote => {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {note: dbNote._id }, { new: true});
    }).then(dbArticle => {
        res.json(dbArticle)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/saved", (req, res) => {
    res.sendFile(__dirname + "/public/saved.html")
})

app.listen(PORT, function() {
    console.log("App running on server " + "http://localhost:" + PORT)
})