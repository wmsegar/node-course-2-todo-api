const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }},
      password: {
        type: String,
        required: true,
        minlength: 6
      },
      tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }]
});


UserSchema.methods.toJSON = function(){
  var user = this;
  //console.log(`This is user: ${user}`)
  //var userObject = user.toObject();
  //console.log(`This is userObject: ${userObject}`);
  return _.pick(user, ['_id', 'email']);

};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  console.log('Above to run return command from method generateAuthToken')
  return user.save().then(function(){
    console.log('About to return the token')
    return token;
  });
};

UserSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e){
    // return new Promise(function(resolve, reject){
    //   reject();
    // })
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

UserSchema.statics.findByCredentials = function(email, password){
  var User = this;

  return User.findOne({email}).then(function(user){
    if (!user){
      return Promise.reject();
    }

    return new Promise(function(resolve, reject){
      bcrypt.compare(password, user.password, function(err, res){
        if(res){
          resolve(user);
        } else {
          reject();
        }
      });
    });

  });
};

UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, function(error, salt){
      bcrypt.hash(user.password, salt, function(error, hash){
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
