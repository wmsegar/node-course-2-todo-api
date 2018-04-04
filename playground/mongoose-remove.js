const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(function(result){
//   console.log(result);
// });

Todo.findOneAndRemove('5ac54c85a82ba60d2424e9dd').then(function(todo){
  console.log(todo);
})
