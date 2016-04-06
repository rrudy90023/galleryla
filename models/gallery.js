var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gallerySchema = require('../services/user-service');

var gallerySchema = new Schema({
  galleryName: { type: String, required: 'Please enter gallery name' },
  address: { type: String, required: 'Please enter address' },
  city: { type: String, required: 'Please enter city'},
  state: { type: String, required: 'Please enter state'},
  zipcode: { type: Number, required: 'Please enter zip code'},
  vrid: { type: String, required: 'Please enter VR ID name'},
  created: { type: Date, default: Date.now }
});

// userSchema.path('email').validate(function(value, next) {
//   userService.findUser(value, function(err, user) {
//     if (err) {
//       console.log(err);
//       return next(false);
//     }
//     next(!user);
//   });
// }, 'That email is already in use');

var Gallery = mongoose.model('Gallery', gallerySchema);


module.exports = {
  Gallery: Gallery
};