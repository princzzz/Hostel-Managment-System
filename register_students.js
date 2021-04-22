var path=require('path')
var express = require('express');  
const session = require('express-session');
const flash = require('flash');
var app = express();  
var redirect = require('redirective');
var bodyParser = require('body-parser');  
const port = process.env.PORT || 8001;

  app.use(session({
    secret:'hostelmanagement',
    saveUninitialized: true,
    resave: true
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.get('/superuser.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "superuser.html",__dirname + "/" + "superuser.css");  
})  

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/register', urlencodedParser, function (req, res) {  
   
   response = {  
       email:req.body.email,  
       password:req.body.pwd, 
       type: "Student"
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  	dbo.collection("Users").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new user added");
	    	db.close();
	  		});
		});
   res.redirect('/superuser.html');

})
app.post('/password', urlencodedParser, function (req, res) {  
   
   response = {  
       email:req.body.email,  
       password:req.body.pwd, 
       type: "Student"
   };  
  console.log(response);  

	  MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var dbo = db.db("login_detail");
	  	var myquery = { email: response.email, type: "Student"};
	  	var newvalues = {$set: {password: response.password } };
	  	dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
	    if (err) throw err;
	    	console.log("1 document updated");
	    db.close();
	  });
});
	   res.redirect('/superuser.html');
})

var server = app.listen(8001, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  