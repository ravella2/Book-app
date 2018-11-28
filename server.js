// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var db = require('./models');

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


////////////////////
//  DATA
///////////////////





////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  db.Book.find(function(err, books) {
    if(err){
      console.log('index error: ' + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var bookId = req.params.id;
  db.Book.findOne({_id: bookId}, function(err, foundBook) {
    if (err){
      console.log(err);
    }
    res.json(foundBook);
  })
});

// create new book

app.post('/api/books', function(req, res) {
  var newBook = req.body;

  db.Book.create(newBook, function(err, savedBook) {
    if (err){
      console.log(err);
    }
    res.json(savedBook);
  });
});

// update book
app.put('/api/books/:id', function(req,res){
  var bookId = req.params.id;
  var book = req.body;
  db.Book.findByIdAndUpdate({_id: bookId}, book, function(err, updatedBook) {
    if (err){
      console.log(err);
    }
    res.json(updatedBook);
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  var bookId = req.params.id;

  db.Book.deleteOne({_id: bookId}, function(err, deletedBook) {
    if (err){
      console.log(err);
    }
    res.json(deletedBook);
  })
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
