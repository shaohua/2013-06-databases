DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  u_id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (u_id)
);

CREATE TABLE messages (
 /* Describe your table here.*/
 msg_id int NOT NULL AUTO_INCREMENT,
 room varchar(30),
 createdAt timestamp,
 u_id int,
 text text,
 PRIMARY KEY (msg_id),
 FOREIGN KEY (u_id) REFERENCES users(u_id)
);

CREATE TABLE friends (
  u1_id int,
  u2_id int,
  FOREIGN KEY (u1_id) REFERENCES users(u_id),
  FOREIGN KEY (u2_id) REFERENCES users(u_id)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
