var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    string: {
        type: String,
        trim: true
    },
    string: {
        type: String,
        trim: true
    },
    string: {
        type: String,
        trim: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;