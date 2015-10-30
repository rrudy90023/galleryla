var bcrypt = require('bcrypt');
var User = require('../models/user').User;
var Docket = require('../models/docket').Docket;


exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      roomNumber: user.roomNumber,
      email: user.email.toLowerCase(),
      password: user.password
    });
    
    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
      next(null);
    });
  });
};



exports.addDocket = function(docket, next) {

    // if (err) {
    //   return next(err);
    // }

    var newDocket = new Docket({
      galleryName: docket.galleryName,
      address: docket.address,

    });
    
    newDocket.save(function(err) {
      // if (err) {
      //   return next(err);
      // }
      next(null);
    });

};





exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);    
  });
};