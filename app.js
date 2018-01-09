var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
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
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json()); //parses JSON from the body into objects
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Auth', authRouter);

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

