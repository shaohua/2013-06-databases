var mysql = require('mysql');
var _ = require('underscore');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
});

dbConnection.connect();


exports.get_msg = function(room, callback){
  dbConnection.query('SELECT messages.room, messages.createdAt, messages.text, users.username from messages INNER JOIN users ON messages.u_id = users.u_id WHERE room=?', room, function(err, rows) {
    if (err) throw err;
    // console.log('The rows are: ', rows);
    callback(rows);
  });
};



var _get_u_id = function(username, callback){
  dbConnection.query('SELECT u_id FROM users WHERE username=?',
    username, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
};

var _insert_new_user = function(username, callback){
  dbConnection.query('INSERT INTO users SET ?', {username: username}, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
};

var _post_anyone = function(msgData){
  dbConnection.query('INSERT INTO messages SET ?', msgData, function(err, result) {
    if(err) {
      console.log(err);
    }
  });
};

exports.post_msg = function(msgData, callback){
  _get_u_id(msgData.username, function(result){
    if(result.length){
      _(msgData).extend({u_id: result[0].u_id});
      delete msgData['username'];
      _post_anyone(msgData);
    } else {
      _insert_new_user(msgData.username, function(result){
        delete msgData['username'];
        _(msgData).extend({u_id: result.insertId});
        _post_anyone(msgData);
      });
    }
  });

  callback();
};