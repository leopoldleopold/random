var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
// var exphbs = require("express-handlebars");
// var moment = require("moment");
// var mongoose = require("mongoose");
var app = express();
var PORT = process.env.PORT || 8080;

// app.use(express.static("public"));

// app.engine("handlebars", exphbs({
//   defaultLayout: "main"
// }));
// app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// movie reviews
axios.get("https://www.rogerebert.com/reviews").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

  $(".review-stack").each(function(i, element) {
    var title = $(element).children().text().split("\n").join("");
    var img = $(element).find("img").attr("src");
    var link = $(element).find("a").attr("href");

    results.push({
      img: img,
      title: title,
      link: link
    });
  });

  console.log(results);
});
// game reviews
axios.get("https://www.ign.com/reviews/games").then(function(response) {
  var $ = cheerio.load(response.data);

  $("article").each(function(i, element) {
    var title = $(element).find("img").attr("alt");
    var link = $(element).find("a").attr("href");
    var img = $(element).find("img").attr("src");
    console.log(title, link, img);
  });

});
app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});

