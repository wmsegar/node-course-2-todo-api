//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5abc10864a5357243cd717ec')},
  //   {
  //     $set: {
  //       completed: true
  //     }
  //   }, {returnOriginal: false}).then(function(result){
  //     console.log(result);
  //   })

  db.collection('User').findOneAndUpdate({_id: new ObjectID('5abad4b7189d2240bcc6bebc')},
    {
      $set: {
        name: 'Sarah'
      },
      $inc: {
        age: 1
      }
    }, {returnOriginal: false}).then(function(result){
      console.log(result);
    })

  //db.close();
});
