// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const Sequelize = require('sequelize');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", async (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/game");
    }
    
    const [results, metadata] = await db.sequelize.query(`
    select 
		@rownum := @rownum + 1 as rownum,
      u.username userName, 
      sum(c.totalcorrect) totalCorrect, 
      sum(c.totalAnswered) totalAnswered, 
      (sum(c.totalcorrect)/sum(c.totalanswered))*100 overallPercentCorrect
    from users u 
    join categories c on (u.id = c.userid)
    join (select @rownum := 0) t
    group by u.userName
    order by overallPercentCorrect desc 
    limit 10`);
    res.render('index', {highScores: results});
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

    const scores=[{cat: "Movies", ques: 4, right: 2},
                    {cat: "Music", ques: 5, right: 3},
                    {cat: "TV", ques: 7, right: 5}];

    res.render('profile', {user:req.user,scores:scores});
  });
  app.get("/game", isAuthenticated, (req, res) => {
    res.render('game',{user:req.user.id});
  });
};
