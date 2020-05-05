const express = require('express');

function routes(Book){
  const bookRouter = express.Router();

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
  })
  ;

  return bookRouter;
}

module.exports = routes;