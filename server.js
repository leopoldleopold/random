var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
// grab model for schema
var db = require("./models")

// var exphbs = require("express-handlebars");
// var moment = require("moment");
var app = express();
var PORT = process.env.PORT || 8080;

// app.use(express.static("public"));

// app.engine("handlebars", exphbs({
//   defaultLayout: "main"
// }));
// app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// movie reviews
axios.get("https://www.rogerebert.com/reviews").then(function (response) {
  let $ = cheerio.load(response.data);
  // array to store article objects
  let array = [];
  $(".review-stack").each(function (i, element) {
    var result = {};

    result.title = $(element).children().text().split("\n").join("");
    result.img = $(element).find("img").attr("src");
    result.link = $(element).find("a").attr("href");
    array.push(result);

    db.Article.create(result)
      .then(function (dbArticle) {
        console.log(dbArticle);
      })
      .catch(function (err) {
        console.log(err);
      });

    if (array.length === 15) {
      console.log(array);
      console.log("that worked");
      getGame();
    }
  });
});

// game reviews
function getGame() {
  axios.get("https://www.ign.com/reviews/games").then(function (response) {
    var $ = cheerio.load(response.data);
    let array = [];
    $("article").each(function (i, element) {
      let result = {};

      result.title = $(element).find("img").attr("alt");
      result.link = $(element).find("a").attr("href");
      result.img = $(element).find("img").attr("src");
      array.push(result);

      db.Article.create(result)
      .then(function (dbArticle) {
        console.log(dbArticle);
      })
      .catch(function (err) {
        console.log(err);
      });

    if (array.length === 10) {
      console.log("that worked");
      getMusic();
    }
    });
  });
}

// music reviews
function getMusic() {
  axios.get("https://pitchfork.com/reviews/albums/").then(function(response) {
  var $ = cheerio.load(response.data);
  let array = [];
  $(".review").each(function(i, element) {
    let result = {};

    var album = $(element).find("h2").text().split("\n").join("");
    console.log(album);
    var artist = $(element).find("ul li:first").text().split("\n").join("");
    console.log(artist);
    result.title = "'" + album +"'" + " by " + artist;
    result.link = $(element).find("a").attr("href");
    result.img = $(element).find("img").attr("src");
    array.push(result);
    // console.log(array);
  });
  });
}

app.listen(PORT, function () {
  console.log("Listening on " + PORT);
});
