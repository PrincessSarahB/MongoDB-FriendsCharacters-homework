const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err) {
    console.log(err);
    return;
  }

  const db = client.db("friends_characters");
  console.log("connected to database!");

  server.post('/api/friends', function(req, res, next){
    const friendsCharacters = db.collection("characters");
    const characterToSave = req.body;
    friendsCharacters.save(characterToSave, function(err, result){
      if(err) next(err);
      res.status(201);
      res.json(result.ops[0]);
    })
  });

  server.get('/api/friends', function(req, res, next){
    const friendsCharacters = db.collection("characters");
    friendsCharacters.find().toArray(function(err, allCharacters){
      if(err) next(err);
      res.json(allCharacters);
    })
  });

  server.post('/api/friends/:id', function(req, res, next){
    const friendsCharacters = db.collection("characters");
    const objectID = ObjectID(req.params.id);
    friendsCharacters.update({_id: objectID}, req.body, function(err, result){
      if(err) next(err);
      res.status(201).send();
    })
  });



server.listen(3000, function(){
  console.log("Listening on port 3000");
});

});
