-- DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
 /* Describe your table here.*/
 msg_id int NOT NULL AUTO_INCREMENT,
 room varchar(30),
 createdAt timestamp,
 username varchar(255),
 message text,
 PRIMARY KEY (msg_id)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
