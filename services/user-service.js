var bcrypt = require('bcrypt');
var User = require('../models/user').User;
var Gallery = require('../models/gallery').Gallery;


exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
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



exports.addGallery = function(gallery, next) {
    var newGallery = new Gallery({
      galleryName: gallery.galleryName,
      address: gallery.address,
      city: gallery.city,
      zipcode: gallery.zipcode,
      state: gallery.state,
      vrid: gallery.vrid
    });
    
    newGallery.save(function(err) {
      next(null);
    });
};





exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);    
  });
};