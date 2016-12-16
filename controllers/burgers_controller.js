var express = require("express");

var router = express.Router();
// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log("handblebars obj")
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.name
  ], function() {
    res.redirect("/burgers");
  });
});

router.put("/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  // console.log("condition", condition);
  // console.log("request");
  // console.log(req.body.devoured);

  burger.update({
    devoured: true
  }, condition, function() {
    res.redirect("/burgers");
  });
});

router.delete("/burgers/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function() {
    res.redirect("/burgers");
  });
});

// Export routes for server.js to use.
module.exports = router;
