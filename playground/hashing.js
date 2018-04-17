const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
bcrypt.genSalt(10, function(error, salt){
  bcrypt.hash(password, salt, function(error, hash){
    console.log(hash);
  })
})

var hashedPassword = '$2a$10$qvuicbTYfJg50xxMXA6vweAW.kaTnCobMmu4Qczd5uXMMbBExyp4C'

bcrypt.compare(password, hashedPassword, function(err, result){
  console.log(result);
})



// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash){
//   console.log('data was not changed')
// } else {
//   console.log('data was changed. Do not trust!')
// }
