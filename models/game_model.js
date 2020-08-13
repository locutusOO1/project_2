const orm = require("../config/orm.js");
//references library
const Sequelize = require("sequelize");
//references connection to the DB
const sequelize = require("../config/connection");
const { SELECT } = require("sequelize/types/lib/query-types");
//Model for fetching all data, creating, updating, and deleting


const Game = sequelize.define("game", {
    category: Sequelize.STRING,
    correct_answer: Sequelize.STRING,
    difficulty: Sequelize.STRING,
    incorrect_answers: Sequelize.STRING,
    question: Sequelize.STRING,
    type: Sequelize.STRING
});

//Syncs with DB
Game.sync();

//Makes Game model available for other files, and creates the table
module.exports = Game;