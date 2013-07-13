var mysql = require('mysql');
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