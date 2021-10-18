const router = require("express").Router();
const Book = require('../models/Book.model');

router.get("/books", (req, res, next) => {
    Book.find()
        .then(data => {
            res.render('booklist', {booksFromDb: data})
    })
        .catch(err => console.log('The error while searching album occurred: ', err));
})

router.get("/bookdetails/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId)
        .then( data => {
            console.log(`henloooooooooooo ${data}`)
            res.render('bookdetails', {detailsFromBook: data})
        })
        .catch(err => console.log('The error while searching album occurred: ', err));
})

module.exports = router;