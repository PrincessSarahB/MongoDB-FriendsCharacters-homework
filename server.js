const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err) {
    console.log(err);
    return;
  }

  const db = client.db("friends_characters");
  console.log("connected to database!");



server.listen(3000, function(){
  console.log("Listening on port 3000");
});

});
