var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app", { useNewUrlParser: true });

exports.Book = require('./book');
