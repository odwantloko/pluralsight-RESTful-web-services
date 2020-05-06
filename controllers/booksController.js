function booksController(Book){
  function post (req, res) {
    const book = new Book(req.body);
    if (!req.body.title){
      res.status(400);
      return res.send('Title is required');
    }

    book.save(); // saves the data to mongoDB
    res.status(201);
    return res.json(book); //response which can be seen through insomnia/postman etc.
}

function get(req,res) {
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

  }

  return {post, get};
}

module.exports = booksController;