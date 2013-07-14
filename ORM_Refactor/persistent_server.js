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

User.hasMany(Message);
Message.belongsTo(User);

// Create the tables:
Message.sync(); // will emit success or failure event
User.sync();

exports.get_msg = function(room, callback){
  Message.findAll({ include: [User], where: { room: room } }).success(function(messages){
    var result = _.map(messages, function(message){
      message.username = message.user.username;
      delete message['user'];
      return message.values;
    });
    callback(result);
  });
};

//exports.get_msg('messages');

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

exports.post_msg = function(msgData, callback){
  User
    .findOrCreate({username:msgData.username})
    .success(function(user, created){
      Message
        .create({room:msgData.room, text:msgData.text, UserId:user.values.id})
        .success(function(message2, created){
          console.log("message created: ", message2);
        });
    });
  callback();
};