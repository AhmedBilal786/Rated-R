var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about',function(req,res){
 res.render('about')
})
router.get('/events',function(req,res){
 res.render('gallery')
})
router.get('/contact',function(req,res){
 res.render('contact')
})
router.post('/submit',function(req,res){
 var name = req.body.name;
 var email = req.body.email;
 var number = req.body.number;
 fs.appendFile('data.txt',`name :${name} , email :${email} , number of booking :${number}\n`,function(e){
  if(e){
    console.log(e);
  }
//creating a Transtorter
var transporter = nodemailer.createTransport({
  service :'gmail',
  auth : {
    user : 'ahmedunisa1305@gmail.com',
    pass : 'spctvuwvymdsjxam'
  }
})
var mailOptions ={
  from : 'ahmedunisa1305@gmail.com',
  to : req.body.email,
  subject : 'successfully tickets booked',
  text : 'congragulations you have successfully booked the ticket for the upcomming event'
}
transporter.sendMail(mailOptions,function(err, info){
  if(err){
    console.log(err);
  }
  else{
    res.render('succes');
  }
})
 })
})
module.exports = router;
