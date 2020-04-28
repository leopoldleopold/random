var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var handle = require("handlebars");
var moment = require("moment");
var mongoose = require("mongoose");
var app = express();
// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.rogerebert.com/reviews").then(function(response) {
  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(response.data);
  // An empty array to save the data that we'll scrape
  var results = [];

  // but be sure to visit the package's npm page to see how it works
  $(".review-stack").each(function(i, element) {
    var title = $(element).children().text().split("\n").join("");
    var img = $(element).find("img").attr("src");
    var link = $(element).find("a").attr("href");
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      img: img,
      title: title,
      link: link
    });
  });
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

// init server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});