var express = require('express');
var router = express.Router();

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


module.exports = router;
