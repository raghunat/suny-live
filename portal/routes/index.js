var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET profile page */
//Testing Object Below
var user = {
    name : "Marcos",
    email  : "maupaso@gmail.com",
    userName : "maupaso",
    password : "test",
    IP : "192.168.0.103",
    type : 5
};

router.get('/profile', function(req, res){
    res.render('profile', {user: user});
});

router.get('/signup', function(req, res){
    res.render("login.ejs", {message: ""});
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


module.exports = router;
