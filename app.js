var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: 'sa',
    password: '1234',
    server: 'MYKLNB-52\\SQLEXPRESS',
    database: 'tempdb'
};

sql.connect(config, function(err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'}, {
    Link: '/Authors',
    Text: 'Author'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/Books', bookRouter);

//Express taking request from the browser
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});