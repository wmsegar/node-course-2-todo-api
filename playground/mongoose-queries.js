const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user');

//var id = '5abe8cc1e4e696fc0a241cae777';
var id = '5ac2af69a82ba60d2424e9dc';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// Todo.find({
//   _id: id
// }).then(function(todos){
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(function(todo){
//   console.log('Todo', todo);
// });

// Todo.findById(id).then(function(todo){
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID', todo)
// }).catch(function(e){
//   console.log(e);
// });

User.findById(id).then(function(user){
  if(!user){
    return console.log('User not found')
  }
  console.log('User by ID', user);
}).catch(function(e){
  console.log(e);
})
