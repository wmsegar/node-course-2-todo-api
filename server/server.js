var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var mongoose = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req, res){
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(function(doc){
    res.send(doc);
  }, function(e){
    res.status(400).send(e);
  });
});

app.get('/todos', function (req, res){
  Todo.find().then(function(todos){
    res.send({todos});
  }, function(err){
    res.status(400).send(e);
  });
});

app.get('/todos/:id', function(req, res){
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  Todo.findById(id).then(function(todo){
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(function(e){
    res.status(400).send();
  });
});

app.listen(3000, function(){
  console.log('started on port 3000');
});

module.exports = {
  app
};
