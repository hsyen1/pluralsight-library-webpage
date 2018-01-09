var express = require('express');
var authRouter = express.Router();
var sql = require('mssql');
var passport = require('passport');

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            var request = new sql.Request();
            var user = {
                username: req.body.userName,
                password: req.body.password
            };
            request.query('insert into users (username, pass) values ' + '(' + '\'' + user.username + '\'' + ', ' + '\'' + user.password + '\'' + ')',
                function(err, results) {
                    //req.login adds the user object to the session
                    //Passport calls serialiszeUser/deserializeUser
                    req.login(user, function() {
                        res.redirect('/auth/profile');
                    });
                });

        });
    authRouter.route('/signIn')
        //if sign in fails, redirect to home
        //else redirect to profile route
        //passport authenticate created a user object in session
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;