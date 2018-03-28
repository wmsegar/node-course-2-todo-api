//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then(function(result){
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then(function(result){
  //   console.log(result);
  // })
  //findOneandDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then(function(result){
    console.log(result);
  })
  //db.close();
});
