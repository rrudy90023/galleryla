var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');
//var restrict = require('../auth/restrict')
var Gallery = require('../models/gallery').Gallery;
/* GET users listing. */

router.get('/api', function(req, res, next) {
  //res.send('respond with a resource');
    // if (!req.isAuthenticated()) {
    //   return res.redirect('/');
    // }

  Gallery.find({}, function(err, galleries){
    var galleryMap = {};
    //dockets.forEach(function(docket){
      for(var i = 0; i<galleries.length; i++){ 
      galleryMap[i] = galleries;

      };
    //});
    res.json(galleries);


  })

});




router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }

    Gallery.find({}, function(err, galleries){
      // var docketMap = {};
      // //dockets.forEach(function(docket){
      //   for(var i = 0; i<dockets.length; i++){ 
      //     var doclist = dockets[i];
      var model = galleries.map(function (gal){

               return {
                  title: 'List of Galleries',
                  galleryName: gal.galleryName,
                  address: gal.address,
                  city: gal.city,
                  zipcode: gal.zipcode,
                  state: gal.state,
                  vrid: gal.vrid,
                  id: gal._id
               };
        });
      console.log(model);
      res.render('galleries/index', { "gallist": model, "firstName": req.user.firstName });
    });
      //});
});




router.get('/create', function(req, res, next) {


  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Create a Gallery',
    firstName: req.user.firstName
  };
  res.render('galleries/create', vm);
});




router.post('/create', function(req, res, next) {
  userService.addGallery(req.body, function(err) {
    //if (err) {
      //console.log(err);
      var vm = {
        title: 'Create a Gallery',
        input: req.body
        //error: err
      };
      console.log(req.body);
      //delete vm.input.password;
      res.redirect('/galleries');
    //}
    // req.login(req.body, function(err) {
    //   res.redirect('/dockets');
    // });
  });
});



router.get('/:id',function(req, res, next){
  
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }


  Gallery.findById(req.params.id, function(err, gallery){

    var ebin = {
      title: 'Edit Gallery',
      galleryName: gallery.galleryName,
      address: gallery.address,
      city: gallery.city,
      zipcode: gallery.zipcode,
      state: gallery.state,
      vrid: gallery.vrid,
      id: gallery._id,
      firstName: req.user.firstName

    };
    console.log(ebin)
    res.render('galleries/edit', ebin);
    //res.json(docket);

  });


});






router.post('/:id',function(req, res){

  var name = req.body.galleryName;
  var address = req.body.address;
  var city = req.body.city;
  var zipcode = req.body.zipcode;
  var state = req.body.state;
  var vrid = req.body.vrid;

    

  if (req.query.method === "delete") {



  Gallery.findById(req.params.id, function(err, gallery){

    gallery.remove(function(err){

      console.log("deleted");

      res.redirect('/galleries');
    //res.json(docket);

    });

  });

  } else {

    Gallery.findById(req.params.id, function(err, gallery){

      gallery.galleryName = name;
      gallery.address = address;
      gallery.city = city;
      gallery.zipcode = zipcode;
      gallery.state = state;
      gallery.vrid = vrid;



      gallery.save(function(err){

        console.log("edited");

        res.redirect('/galleries');
      //res.json(docket);

      });

    });

  }

});






module.exports = router;
