// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Sequelize = require('sequelize');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      userName: req.user.userName,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      userName: req.body.userName,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    console.log(req);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        userName: req.user.userName,
        id: req.user.id
      });
    }
  });
  
  // Route for deleting user
  // app.get("/api/delete/:id", (req, res) => {
  app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    db.User.destroy({
      where: {
        id
      }
    }).then(function(){
      req.logout();
      res.redirect("/");
    });
  });

  // route for handling insertion/update of new categories and their scores
  // app.post("/api/update", async (req, res) => {
  //   let userId = req.body.userId;
  //   let scores = req.body.scores;
  app.get("/api/update", async (req, res) => {
    let userId = 4;
    let scores = [{cat: "Movies", ques: 4, right: 2},
                  {cat: "Music", ques: 5, right: 3},
                  {cat: "TV", ques: 7, right: 5}];
    //
    for (let i = 0; i < scores.length; i++) {
      // first try to insert category
      db.Category.create({
        UserId: userId,
        categoryName: scores[i].cat,
        totalCorrect: scores[i].right,
        totalAnswered: scores[i].ques,
      })
        .then(() => {
        })
        .catch(err => {
          console.log(err.name);
          // if category already exists for user, then update it instead of creating it
          if (err.name === "SequelizeUniqueConstraintError") {
            db.Category.update({
              totalCorrect: Sequelize.literal(`totalCorrect + ${scores[i].right}`),
              totalAnswered: Sequelize.literal(`totalAnswered + ${scores[i].ques}`)
            }, {
              where: {
                UserId: userId,
                categoryName: scores[i].cat
              }
            }).then(() => {
            }).catch(err2 => {
              console.log(err2);
            });
          }
        });
    }
    await res.redirect("/profile");
  });

  app.get("/api/high_scores",async (req,res) => {
    const [results, metadata] = await db.sequelize.query(`
    select 
      u.username userName, 
      sum(c.totalcorrect) totalCorrect, 
      sum(c.totalAnswered) totalAnswered, 
      (sum(c.totalcorrect)/sum(c.totalanswered))*100 overallPercentCorrect
    from users u 
    join categories c on (u.id = c.userid)
    group by u.userName
    order by overallPercentCorrect desc`);
    console.log(results);
    // console.log(metadata);
    res.json(results);
  });

  app.get("/api/user_categories/:id",(req,res) => {
    const UserId = req.params.id;
    db.Category.findAll({where: {UserId}}).then(function(data) {
      res.json(data);
    });
  });


};
