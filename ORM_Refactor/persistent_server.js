var mysql = require('mysql');
var _ = require('underscore');
var Sequelize = require("sequelize");

//we are using chat2!!!
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

// Create the tables if necessary:
Message.sync();
User.sync();

exports.get_msg = function(room, callback){
  Message
    .findAll({ include: [User], where: { room: room } })
    .success(function(messages){
      var result = _.map(messages, function(message){
        //get username from the message.user obj
        //then delete the message.user obj
        message.username = message.user.username;
        delete message['user'];
        return message.values;
      });
      callback(result);
    });
};

exports.post_msg = function(msgData, callback){
  User
    .findOrCreate({username:msgData.username})
    .success(function(user, created){
      Message
        .create({room:msgData.room, text:msgData.text, UserId:user.values.id})
        .success(function(message2, created){
          callback();
        });
    });
};