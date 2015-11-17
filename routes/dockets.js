var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');
var restrict = require('../auth/restrict')
var Docket = require('../models/docket').Docket;
/* GET users listing. */

router.get('/api', function(req, res, next) {
  //res.send('respond with a resource');
    // if (!req.isAuthenticated()) {
    //   return res.redirect('/');
    // }

  Docket.find({}, function(err, dockets){
    var docketMap = {};
    //dockets.forEach(function(docket){
      for(var i = 0; i<dockets.length; i++){ 
      docketMap[i] = dockets;

      };
    //});
    res.json(dockets);


  })

});




router.get('/', restrict, function(req, res, next) {
  //res.send('respond with a resource');
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }


    
    Docket.find({}, function(err, dockets){
      // var docketMap = {};
      // //dockets.forEach(function(docket){
      //   for(var i = 0; i<dockets.length; i++){ 
      //     var doclist = dockets[i];
      var model = dockets.map(function (doc){

               
               return {
                  title: 'List of Dockets',
                  galleryName: doc.galleryName,
                  address: doc.address
               };
        });


      res.render('dockets/index', { "doclist": model, "firstName": req.user.firstName });


    });
 

      //});


});




router.get('/create', function(req, res, next) {


  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Create a docket',
    firstName: req.user.firstName
  };
  res.render('dockets/create', vm);
});




router.post('/create', function(req, res, next) {
  userService.addDocket(req.body, function(err) {
    //if (err) {
      //console.log(err);
      var vm = {
        title: 'Create a docket',
        input: req.body
        //error: err
      };
      //delete vm.input.password;
      res.redirect('/dockets');
    //}
    // req.login(req.body, function(err) {
    //   res.redirect('/dockets');
    // });
  });
});



module.exports = router;
