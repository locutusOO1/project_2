//MAY NOT NEED!!!! But could we use LoopBack??


//Make connection to MySQL
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "trivia_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Make connection with Sequelize and to MySQL
const Sequelize = require("sequelize");

const sequelize = new Sequelize( "trivia_db", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  


  // Export connection for our ORM to use.
module.exports = connection;
  // Exports the connection for other files to use
module.exports = sequelize;