var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var handle = require("handlebars");
var moment = require("moment");
var mongoose = require("mongoose");
var app = express();

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

