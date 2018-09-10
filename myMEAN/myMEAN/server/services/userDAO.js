const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/userModel');

var app = express();

/*==========
  Service
============*/
exports.findOne = function (user_id, user_pw){
  console.log('Hello!');
  User.findOne({'userid': user_id, 'userpw': user_pw}, function(err, data){
    return data;
  });
}//findOne

exports.login = function(){
  app.post("/login", function(req, res){
    var user_id = req.body.id;
    var user_pw = req.body.pw;

    User.findOne({'userid': user_id, 'userpw': user_pw}, function(err, data){
      if(err) throw err;
      res.send(data);
      res.end(); // I NEED TO FIND THE REASON WHY IT IS NEEDED TO BE HERE!!!!!!!!!!!!!!!!!!!!
    });// findOne
    //res.end(); // NOT HERE
  }); // login
}// login





mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
