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
            res.render('bookdetails', {detailsFromBook: data})
        })
        .catch(err => console.log('The error while searching album occurred: ', err));
});

router.get('/create', (req, res, next) => {
    res.render('create')
})

router.post( '/create',(req, res, next) => {
    const {title, author, description, rating} = req.body;
    Book.create({ title, author, description, rating})
        .then( () => {
            res.redirect('/books')
        })
        .catch( (err) => {
            console.log(`an error occured sending the data from form to db: ${err}`)
        })
})

router.get('/bookdetails/:bookId/edit', (req, res, next) => {
    Book.findById(req.params.bookId)
        .then((data) => {
            res.render('edit', data)
        })
        .catch((err) => {
            console.log(`An error ocurred: ${err}`)
        })
})

router.post('/bookdetails/:bookId/edit', (req, res, next) => {
    const { title, author, description, rating} = req.body;
    const newDetails = {
        title,
        author,
        description,
        rating,
    }
    Book.findByIdAndUpdate(req.params.bookId, newDetails, { new:true })
        .then((data) => {
             res.redirect(`/bookdetails/${data.id}`)
        })
        .catch((err) => {
            console.log(`An error ocurred: ${err}`)
        })
})

router.post('/bookdetails/:bookId/delete', (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId, function (err) {
        if (err) {
            throw console.error(err);
        } else {
            res.redirect("/books");
        }
    });
})

module.exports = router;