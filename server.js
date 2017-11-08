// Load the express library, which we installed using npm
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;
var urlResponseHandlers = require("./urlResponseHandler");
var controller = require("./controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.redirect("index.html");
});

app.post('/insertUser', function(req, res) {
  console.log("Inserting user");
  controller.dispatch(urlResponseHandlers.saveUser2DB, req, res);
}); 

//insert a car to de database
app.post('/insertCar', function(req, res) {
  console.log("Inserting car");
  controller.dispatch(urlResponseHandlers.saveCar2DB, req, res);
  //res.redirect('/');
});

app.post('/login', (req, res) => {
  console.log("Logged in correctly");
  controller.dispatch(urlResponseHandlers.logIn, req, res);
}); 

//delete user
app.post('/delete', function(req, res, next) {
  console.log("User Deleted");
  controller.dispatch(urlResponseHandlers.deleteUser, req, res);
}); 
        
//update user's password
app.post('/update', function(req, res, next) {
  console.log("User Updated Correctly");
  controller.dispatch(urlResponseHandlers.updateUser, req, res);
});

//send email
app.post('/send', function(req, res, next){
   console.log("Email sent correctly");
   controller.dispatch(urlResponseHandlers.sendEmail, req, res);
});

//retrieve cars from db
app.get('/getCarInfo', function(req, res) {
    //res.send('hello world'); 
    controller.dispatch(urlResponseHandlers.retrieveCars, req, res); 
}); 

//send email with forgotten password
app.post('/forget', function(req, res) {
    //res.send('hello world'); 
    console.log("Email sent with the user pass"); 
    controller.dispatch(urlResponseHandlers.forgetPass, req, res); 
}); 

app.post('/postPlate', function(req, res) {
    //console.log(req.body.numberPlate);
    controller.dispatch(urlResponseHandlers.carInfo, req, res); 
}); 

app.get('/getPlate', function(req, res) {
    //console.log(req.body.numberPlate);
    controller.dispatch(urlResponseHandlers.carInfoC, req, res); 
}); 



//PENDIENTE
app.post('/getCarCompleteInfo', function(req, res, next) {
 var plate = req.body.plate; 
    
    mongo.connect(url, function(err, db) {
        db.collection('cars').find({"plate": plate}).toArray((err, result) => {
         console.log(plate); 
            if(err){   
          return console.log(err); 
         }
         assert.equal(null, err);
         res.render('indexCar.ejs', {quotes: result}); 
     }); 
 });
}); 


// This is where we actually get the server started. We
// default to port 3000, unless the process has another
// port defined, and we log that we are up and running.
var port = process.env.PORT || 2000;
app.listen(port, function(){
  console.log("Listening on " + port);
});