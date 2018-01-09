var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {

    //if the user is not signed in, user cant access to books
    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });

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
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id = @id',
                function(err) {
                    ps.execute({
                            id:req.params.id
                        },
                        function(err, recordset) {
                            if (recordset['recordset'].length === 0) {
                                res.status(404).send('Not found');
                            } else {
                                req.book = recordset['recordset'][0];
                                next();
                            }

                        });
                });
        })
        .get(function(req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });
    return bookRouter;
};

module.exports = router;