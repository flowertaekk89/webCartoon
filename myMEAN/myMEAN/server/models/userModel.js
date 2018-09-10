const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
  userid: {type: String, required: true, unique: true},
  userpw: {type: String, required: true},
  userEmail: {type: String, required: true},
  userType: {type: String, required: true},
  createdAt: Date,
  updatedAt: Date
}//userSchema

var User = mongoose.model('User', userSchema);

module.exports = User;
