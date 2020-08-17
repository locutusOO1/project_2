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
<<<<<<< HEAD
    res.render('index');
=======
    
    //SELECT name, score FROM users WHERE LIMIT 10
    //Make request to DB for scores
    res.render('index', {highScores: [{name: 'bob', score: 45}, {name: 'chris', score: 5},{name: 'mike', score: 76}]});
>>>>>>> 88853070dcaeb08452ca208c5049bef11d52f824
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
  app.get("/profile", isAuthenticated, (req, res) => {
    res.render('profile');
<<<<<<< HEAD
=======
  });
  app.get("/game", isAuthenticated, (req, res) => {
    res.render('game');
>>>>>>> 88853070dcaeb08452ca208c5049bef11d52f824
  });

  
  app.get("/game", isAuthenticated, (req, res) => {
    res.render('game');
  });
};