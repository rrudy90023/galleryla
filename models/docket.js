var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var docketSchema = require('../services/user-service');

var docketSchema = new Schema({
  galleryName: {type: String, required: 'Please enter gallery name'},
  address: {type: String, required: 'Please enter address'},
  created: {type: Date, default: Date.now}
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

var Docket = mongoose.model('Docket', docketSchema);

module.exports = {
  Docket: Docket
};