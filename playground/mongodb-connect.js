//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something else to do',
  //   completed: false
  // }, function(err, result){
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  // var user = {
  //   name: 'Sarah',
  //   age: 32,
  //   location: 'Hoboken'
  // };
  //
  // db.collection('User').insertOne(user, function(err, result){
  //   if(err){
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(`${user} has been added to the database`);
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
