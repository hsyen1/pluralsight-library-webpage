var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var sql = require('mssql');
var localStrategyFunction = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
        //this is where we go to the database to do the checking on user/password
        //authentication
    function(username, password, done) {
        var request = new sql.Request();
        request.query('select username, pass from users where username = ' + '\'' + username + '\'' + ' and pass = ' + '\'' + password + '\'',
            function(err, results) {
            delete results.recordsets;
            delete results.output;
            delete results.rowsAffected;
            results = results['recordset'][0];
            console.log(password);
            console.log(results.pass);
            if (results.pass === password) {
                var user = results;
                done(null, user);
            } else {
                done(null, false, {message: 'Bad password'});
            }
        });
    }));
};

module.exports = localStrategyFunction;