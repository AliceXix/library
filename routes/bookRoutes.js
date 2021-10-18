const router = require("express").Router();
const Book = require('../models/Book.model');

router.get("/books", (req, res, next) => {
    Book.find()
        .then(data => {
            res.render('booklist', {booksFromDb: data})
    })
    .catch( () => {

    })
})



module.exports = router;