var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ];
    //this routes to the nav bar
    //Link: sent to the ejs file to make it click-able by adding it to the href
    //Text: the text of the nav bar
    //books are sent into bookListView's stories
    bookRouter.route('/')
        .get(function(req, res) {
            var request = new sql.Request();
            request.query('select * from books',
                function(err, recordset) {
                    //deletes the extra properties as HTML can only read in a list to render
                    delete recordset.recordsets;
                    delete recordset.output;
                    delete recordset.rowsAffected;
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset['recordset']
                    });
                });

        });
    //routes to each of the book page according to their id
    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
};

module.exports = router;