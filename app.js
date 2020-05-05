const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
//const bookRouter = require('./routes/bookRouter')

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  // POST method which writes to the db
  .post((req, res) => {
      const book = new Book(req.body);

      book.save(); // saves the data to mongoDB
      return res.status(201).json(book); //response which can be seen through insomnia/postman etc.
  })
  
  // GET request which returns a list of books
  .get((req,res) => {
    const query = {};

    // if req.query has the genre
    if(req.query.genre){
      query.genre = req.query.genre;

    }
    Book.find(query, (err, books) => {
      if(err){
        return res.send(err);
      }

      return res.json(books)
      
    });

  });


bookRouter.route('/books/:bookId')
  // GET request which returns a single item
  .get((req,res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if(err){
        return res.send(err);
      }

      return res.json(book)
      
    });

  });


app.use('/api', bookRouter); 

app.get('/', (req, res) => {
  res.send('Welcome to my nodemon API');
});

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});
