var passport = require('passport');

var passportFunction = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    //stores the user into the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        //add code here to pull user out from database
        done(null, user);
    });

    require('./strategies/local.strategy')();
};

module.exports = passportFunction;