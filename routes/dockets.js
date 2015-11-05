var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');
var Docket = require('../models/docket').Docket;
/* GET users listing. */

router.get('/api', function(req, res, next) {
  //res.send('respond with a resource');
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }

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




router.get('/index', function(req, res, next) {
  //res.send('respond with a resource');
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }


    

      Docket.find({}, function(err, dockets){

        var docketMap = {};

        //dockets.forEach(function(err, docket){


            //docketMap[docket.galleryName] = docket;

          // var docgal = null;

          // docgal = docketMap[docket.galleryName];


             var model = {
               title: 'all dockets',
               galleryName: dockets.galleryName

             };

             console.log(dockets);
           res.render('dockets/index', model);

        //});

      

    

      });


});




router.get('/create', function(req, res, next) {


  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Create a docket'
  };
  res.render('dockets/create', vm);
});

router.post('/create', function(req, res, next) {
  userService.addDocket(req.body, function(err) {
    //if (err) {
      console.log(err);
      var vm = {
        title: 'Create a docket',
        input: req.body
        //error: err
      };
      //delete vm.input.password;
      return res.render('dockets/create', vm);
    //}
    // req.login(req.body, function(err) {
    //   res.redirect('/dockets');
    // });
  });
});



module.exports = router;
