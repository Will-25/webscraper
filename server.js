const express = require("express");
const exphb = require("express-handlebars");
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


app.get("/", (req, res) => {
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

                db.Article.create(result).then(dbArticle => {
                    console.log(dbArticle)
                })
            })
      
        
    })
})

app.listen(PORT, function() {
    console.log("App running on server " + "http://localhost:" + PORT)
})