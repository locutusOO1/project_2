// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/game");
    }
    
    //SELECT name, score FROM users WHERE LIMIT 10
    //Make request to DB for scores
    res.render('index', {highScores: [{name: 'bob', score: 45}, {name: 'chris', score: 5},{name: 'mike', score: 76}]});
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/game");
    }
    res.render('signup');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", (req, res) => {
    res.render('profile');
  });

  app.get("/game", (req, res) => {
    res.render('game');
  });
};