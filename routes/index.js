var express = require("express");
var router = express.Router({mergeParams : true});
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing.ejs");
});

router.get("/register", function(req, res) {
    res.render("register.ejs");
});

router.post("/register", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username : username}), password, function(err,user){
        if (err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp");
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res) {
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You Logged Out Successfully");
    res.redirect("/campgrounds");
});

module.exports = router;