//MAY NOT NEED THIS AS SEQUELIZE IS AN ORM

// const connection = require("../config/connection.js")
// const config = require("../config/config.json")

// //6 fields per object from OpenTDB
//     //1 category
//     //2 correct_answer
//     //3 difficulty
//     //4 incorrect_answers
//     //5 question
//     //6 type (either "boolean" or "multiple")


// //Helper function for SQL syntax
// //See week 13 MVC Activity 17 CatsApp ORM
// function printQuestionMarks(num) {
//     const arr = [];

//     for (var i = 0; i < num; i++) {
//         arr.push("?");
//     }
//     return arr.toString();
// }

// //Helper function to convert object key/values as a pairs to SQL syntax
// //See week 13 MVC Activity 17 CatsApp ORM
// function objToSql(ob) {
//     const arr = [];

//     for (let key in ob) {
//         const value = ob[key];
//         if (Object.hasOwnProperty.call(ob, key)) {
//             if (typeof value === "string" && value.indexOf(" ") >= 0) {
//                 value = "'" + value + "'";
//             }
//             arr.push(key + "=" + value);
//         }
//     }
//     return arr.toString();
// }


// //Object for all SQL statement functions;
// const orm = {
// all: function(table, cb) {
//     const queryString = "SELECT * FROM" + tableInput + ";";
//     connection.query(queryString, function(err, result) {
//         if (err) { throw err }
//         cb(result);
//     });
// },
// create: function(table, cols, vals, cb) {
//     const queryString = "INSERT INTO " + table;

//     queryString += " (";
//     queryString += cols.toString();
//     queryString += ") ";
//     queryString += "VALUES (";
//     queryString += printQuestionMarks(vals.length);
//     queryString += ") ";

//     console.log(queryString);

//     connection.query(queryString, vals, function(err, result) {
//         if (err) { throw err }
//         cb(result);
//     });
// },
// update: function(table, objColVals, condition, db) {
//     const queryString = "UPDATE " + table;

//     queryString += " SET ";
//     queryString += objToSql(objColVals);
//     queryString += " WHERE "
//     queryString += condition;

//     console.log(queryString);
//     connection.query(queryString, function(err, result) {
//         if (err) { throw err }
//         scrollBy(result);
//     });
// },
// delete: function(table, condition, cb) {
//     const queryString = "DELETE FROM " + table;
//     queryString += " WHERE ";
//     queryString += condition;

//     connection.query(queryString, function(err, result) {
//         if (err) { throw err }
//         cb(result);
//     });
//     }
// };


// module.exports = orm;