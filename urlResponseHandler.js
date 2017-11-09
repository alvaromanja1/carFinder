var url = require("url");
var MongoClient = require('mongodb').MongoClient;
var conversionsXML = "";
var assert = require('assert');
var callback = require('callback'); 
var nodemailer = require('nodemailer');
var express = require("express");
var app = express();
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "alvarocoches96@gmail.com",
        pass: "ilovecars"
    }
});

function saveUser2DB(req, res) {
	 var user = {
        realname: req.body.realname,
        nick: req.body.nick,
        telephone: req.body.telephone, 
        pass: req.body.passwo
  };
	
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;

		db.collection('users').insertOne(user, function(err, result) {
            assert.equal(null, err);
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted in the database
				console.log("Error produced: " + err);
			} else {
				console.log("Información guardada: " + err);
                res.redirect('/');
			}
		});
	});
}

function saveCar2DB(req, res) {
	  var car = {
        plate: req.body.plate,
        brand: req.body.brand,
        model: req.body.model, 
        colour: req.body.colour, 
        km: req.body.km, 
        price: req.body.price, 
        year: req.body.year, 
        horsepower: req.body.horsepower, 
        name: req.body.name, 
        phone: req.body.phone,
        mail: req.body.mail,
        localization: req.body.localization
  };

	
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;

		db.collection('cars').insertOne(car, function(err, result) {
            assert.equal(null, err);
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted in the database
				console.log("Error produced: " + err);
			} else {
				console.log("Información guardada: " + err);
                res.redirect('/indexCar.html'); 
			}
		});
	});
}

function logIn(req, res) {
    var mail = req.body.email; 
    var pass = req.body.passw; 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    
    db.collection('users').findOne({"nick": mail, "pass": pass}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        
        if(!result) { 
            console.log('Error');
            return res.status(404).send();
        }
        console.log('Logged In correctly');
        res.redirect('/indexCar.html');
        return res.status(200).send(); 
        })
    });
}

function deleteUser(req, res) {
   var id = req.body.id;

     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
   
     db.collection('users').deleteOne({"nick": id}, function(err, result) {
      assert.equal(null, err);
      console.log('User deleted');
      db.close();
    });
 });
}

function updateUser(req, res) {
 var item = {
    pass: req.body.pass
  };
   
  var nick = req.body.nick;
  var oldPass = req.body.oldPass;

  MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
      
  db.collection('users').updateOne({"nick": nick, "pass": oldPass}, {$set: item}, function (err, result){
      assert.equal(null, err);
      console.log('Password updated');
      db.close();
    });
  });
}

function sendEmail(req, res){
      var inputName = req.body.inputName; 
      var email = req.body.email;
      var issue = req.body.issue; 
      var text = req.body.text; 
    
    //send email
    var mailOptions={
        from: email, 
        to : "alvarocoches96@gmail.com",
        subject : issue ,
        text : text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.redirect('/indexCar.html');
         }
});
    
    var mailOptions={
        to : email,
        subject : "Message correctly sent" ,
        text : 'Dear ' + inputName +', your message has been sent to the admin and you will receive an answer briefly.'
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.redirect('/indexCar.html');
         }
});
    
}

function retrieveCars(req, res){

    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    assert.equal(null, err);      
    
     db.collection('cars').find().toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        //var json = JSON.stringify(results)
        //var json = res.json(results); 
        //console.log(json); 
        //res.send(JSON.stringify(results));
        res.json(results); 
    }      
  }); 
}); 
}

function forgetPass(req, res){
    var nick = req.body.nick; 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    
    db.collection('users').findOne({"nick": nick}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        
        if(!result) { 
            console.log('Error');
            return res.status(404).send();
        }
        console.log(result.pass);
            
        var mailOptions={
        to : nick,
        subject : "Forgotten Password" ,
        text: 'Dear Client, your password is: ' + result.pass
        }
        
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log(error);
             res.end("error");
         }else{
            console.log("Message sent: " + response.message);
            res.redirect('/index.html');
         }
    });
        })
    });
}

function carInfo(req, res){
    console.log(req.body.numberPlate); 
    var plate = req.body.numberPlate; 
    
     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
        assert.equal(null, err);      
    
     db.collection('cars').find({"plate": plate}).toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        //var json = JSON.stringify(results)
        //var json = res.json(results); 
        //console.log(json); 
        //res.send(JSON.stringify(results));
        console.log(results); 
        res.json(results); 
    }      
  }); 
}); 
}

function carInfoC(req, res){
    console.log(req.body.numberPlate); 
    var plate = req.body.numberPlate; 
    
     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
        assert.equal(null, err);      
    
     db.collection('cars').find({"plate": plate}).toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        //var json = JSON.stringify(results)
        //var json = res.json(results); 
        //console.log(json); 
        //res.send(JSON.stringify(results));
        console.log(results); 
        res.json(results); 
    }      
  }); 
}); 
}

function deleteCar(req, res){
     console.log(req.body.matricula); 
     var plate = req.body.matricula; 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
   
     db.collection('cars').deleteOne({"plate": plate}, function(err, result) {
      assert.equal(null, err);
      console.log('Car deleted');
      db.close();
    });
 });
    
}

function sellerSendMail(req, res){
    var mail = req.body.mail; 
    var sellerName = req.body.sellerName; 
    var brand = req.body.brand; 
    var model = req.body.model; 
    
    var mailOptions={
        to : mail,
        subject : "Car for sale" ,
        text : 'Dear '+ sellerName + ', someone is interested in your '+ brand + ' '+ model + '. Please be alerted of your email and phone. '
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
         }
});
    
}

exports.saveUser2DB = saveUser2DB;
exports.saveCar2DB = saveCar2DB;
exports.logIn = logIn;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.sendEmail = sendEmail; 
exports.retrieveCars = retrieveCars; 
exports.forgetPass = forgetPass; 
exports.carInfo = carInfo; 
exports.carInfoC = carInfoC; 
exports.deleteCar = deleteCar;
exports.sellerSendMail = sellerSendMail;