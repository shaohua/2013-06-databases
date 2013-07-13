var mysql = require('mysql');
var _ = require('underscore');
var Sequelize = require("sequelize");

var sequelize = new Sequelize("chat2", "root", "");

// setting up objects and relationships

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  room: Sequelize.STRING,
  text: Sequelize.TEXT
});

Message.belongsTo(User);
User.hasMany(Message);

// Create the tables:
Message.sync(); // will emit success or failure event
User.sync().success(function() {



  User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
    // This function is called back with an array of matches.
    for (var i = 0; i < usrs.length; i++) {
      console.log(usrs[i].username + " exists");
    }
  });

  User
    .findOrCreate({username:'ellllllllllllllllll'})
    .success(function(user, created){
      console.log('user: ', user, '\n');
      console.log(user.values, created);
    });

  Message
    .create({room:'messages', text:'msg1', username:'ellllllllllllllllll'})
    .success(function(){

    });

});




// exports.get_msg = function(room, callback){
//   dbConnection.query('SELECT messages.room, messages.createdAt, messages.text, users.username from messages INNER JOIN users ON messages.u_id = users.u_id WHERE room=?', room, function(err, rows) {
//     if (err) throw err;
//     // console.log('The rows are: ', rows);
//     callback(rows);
//   });
// };



// var _get_u_id = function(username, callback){
//   dbConnection.query('SELECT u_id FROM users WHERE username=?',
//     username, function(err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(result);
//     }
//   });
// };

// var _insert_new_user = function(username, callback){
//   dbConnection.query('INSERT INTO users SET ?', {username: username}, function(err, result) {
//     if(err) {
//       console.log(err);
//     } else {
//       callback(result);
//     }
//   });
// };

// var _post_anyone = function(msgData){
//   dbConnection.query('INSERT INTO messages SET ?', msgData, function(err, result) {
//     if(err) {
//       console.log(err);
//     }
//   });
// };

// exports.post_msg = function(msgData, callback){
//   _get_u_id(msgData.username, function(result){
//     if(result.length){
//       _(msgData).extend({u_id: result[0].u_id});
//       delete msgData['username'];
//       _post_anyone(msgData);
//     } else {
//       _insert_new_user(msgData.username, function(result){
//         delete msgData['username'];
//         _(msgData).extend({u_id: result.insertId});
//         _post_anyone(msgData);
//       });
//     }
//   });

//   callback();
// };