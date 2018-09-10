const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // it makes req.body enable
const fs = require('fs');
const formidable = require('formidable');

const User = require('./models/userModel');
const Manga = require('./models/mangaModel')
const userDAO = require('./services/userDAO');

var app = express();

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // CORS
app.use(bodyParser.json()); // body-parse
app.use(bodyParser.text());

/*==========
 User Method
============*/
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

app.post("/insertUser", function(req, res){
  //console.log(req.body.userType);
  var insertData = new User({
    'userid': req.body.id,
    'userpw': req.body.pw,
    'userEmail': req.body.email,
    'userType': req.body.userType,
    'createdAt': Date()
  });

  User.findOne({'userid':req.body.id}, function(err, data){
    if(err) throw err;
    if(!data){
      insertData.save(function(err){
        if(err) throw err;
        console.log('new user data saved!');
      });
      res.send(true);
      res.end();
    } else {
      res.send(false);
      res.end();
    }// if
  }); // findOne
});// insertUser

app.post('/updateUser', function(req, res){
  User.findOneAndUpdate({'userid': req.body.userid}, {'userpw': req.body.userpw, 'userEmail': req.body.userEmail, 'userType': req.body.userType, 'updatedAt': Date()}, function(err, user){
    if(err) throw err;
    if(user){
      res.send(true);
    } else {
      res.send(false);
    }// if
    res.end();
  });// findOneAndUpdate
}); // updateUser

/*==========
 Cartoon Method
============*/
app.post('/manga/findAll', function(req, res){
  Manga.find({'episode': 1}, function(err, data){
    if(err) throw err;
    // console.log(data);
    res.send(data);
    res.end();
  });// find
}); // findAll

app.post('/manga/readManga', function(req, res){
  Manga.find({'title': req.body.title}).sort({episode: 1}).exec(function(err, data){
    if(err) throw err;
    res.send(data);
    res.end();
  })

});// readManga

app.post('/searchManga', function(req, res){
  Manga.find({'title': {$regex: RegExp(req.body.title)}, 'episode': 1}, function(err, data){
    if(err) throw err;
    res.send(data);
    res.end();
  });// find
});// searchWord

/*==========
 File Method
============*/

app.post('/fileUpload', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    // console.log('serer : ' + (Object.keys(files)[0]));
    // console.log('files : ' + JSON.stringify(files));
    // console.log('fields : ' + JSON.stringify(fields));
    var fileProp = Object.keys(files)[0];
    var oldPath = '';
    var newPath = 'C:/Users/user/Desktop/projects/myMEAN/img/';

    if(fileProp === 'coverFile'){
      oldPath = files.coverFile.path;
      newPath += fields.title + '/' + files.coverFile.name;
    } else if (fileProp === 'mangaFile'){
      oldPath = files.mangaFile.path;
      newPath += fields.title + '/' + files.mangaFile.name;
    }// if

    // console.log('oldPath : '+ oldPath);
    // console.log('newPath : '+ newPath);

    fs.rename(oldPath, newPath, function(err){
      if(err) throw err;
      res.end();
    });// fs
  });// form
});// fileUpload

app.post('/fileToDB', function(req, res){

  let updateData_json = {
    'cover_img': 'C:/Users/user/Desktop/projects/myMEAN/img/' + req.body.title + '/' + req.body.coverFile,
    'manga_img': 'C:/Users/user/Desktop/projects/myMEAN/img/' + req.body.title + '/' +req.body.mangaFile,
    'title': req.body.title,
    'episode': req.body.episode,
    'subtitle': req.body.subtitle
  };// updateData_json

  Manga.find({'title': updateData_json.title, $or: [{'manga_img': updateData_json.manga_img}, {'episode': updateData_json.episode}] }, function(err, data){
    if(err) throw err;
    if(data != ''){

      let result = {'msg': false};
      res.send(result);
      res.end();

    } else {
      let dirPath = 'C:/Users/user/Desktop/projects/myMEAN/img/';
      directoryCheck(dirPath + req.body.title);

      Manga.update(updateData_json, updateData_json, {upsert: true}, function(err){
        if(err) throw err;
        // console.log('DBのファイル情報アップデート');
        let result = {'msg': true};
        res.send(result);
        res.end();
      });// upsert

    }// if
  }); // find
}); // file upload to DB

app.get('/imgFile', function(req, res){
  // console.log('imgFile : ' + req.param('name'));

  fs.readFile(req.param('name'), function(err, data){
    res.writeHead(200, {'Content-Type': "image/png"});
    if(data) res.write(data);
    res.end();
  });
});

/*==========
  Server connection
============*/
app.listen(3000, function(err){
  if(err) throw err;
  console.log('Server connected!');
});

/*==========
    Utils
============*/

function directoryCheck(dirAddress){
  if(!fs.existsSync(dirAddress)){
    fs.mkdirSync(dirAddress);
  }//if
}// directoryCheck

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
