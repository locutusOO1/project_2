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
    try {
    const [results, metadata] = await db.sequelize.query(`
    select 
      u.username userName, 
      sum(c.totalcorrect) totalCorrect, 
      sum(c.totalAnswered) totalAnswered, 
      concat(format((sum(c.totalcorrect)/sum(c.totalanswered))*100,2),'%') overallPercentCorrect
    from users u 
    join categories c on (u.id = c.userid)
    group by u.userName
    order by overallPercentCorrect desc 
    limit 10`);
    res.render('index', {highScores: results});
    }catch(err){res.render("index",{highscores:[]})};
  });
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.render('signup');
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, async(req, res) => {
    try {
    const [results, metadata] = await db.sequelize.query(`
        select 
        u.username userName, 
        c.totalcorrect totalCorrect, 
        c.totalAnswered totalAnswered, 
        c.categoryName categoryName,
        concat(format((c.totalcorrect/c.totalanswered)*100,2),'%') categoryPercentCorrect
        from users u 
        join categories c on (u.id = c.userid)
        where u.id = ${req.user.id}
        order by categoryPercentCorrect desc`);
        const [results2, metadata2] = await db.sequelize.query(`
        select 
        u.username userName, 
        sum(c.totalcorrect) totalCorrect, 
        sum(c.totalAnswered) totalAnswered, 
        concat(format((sum(c.totalcorrect)/sum(c.totalanswered))*100,2),'%') overallPercentCorrect
        from users u 
        join categories c on (u.id = c.userid)
        where u.id = ${req.user.id}
        group by u.userName`);
      }catch(err){res.render("profile",{user:req.user, scores:[], overall:[]})};
    console.log(results2)
    res.render('profile', {user:req.user, scores:results, overall:results2});
  });
  app.get("/game", isAuthenticated, (req, res) => {
    res.render('game',{user:req.user.id});
  });
};