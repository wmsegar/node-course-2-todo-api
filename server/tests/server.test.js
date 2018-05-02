const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', function(){
  it('should create a new todo', function(done){
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect(function(res){
        expect(res.body.text).toBe(text)
      })
      .end(function(err, res){
        if (err){
          return done(err);
        }

        Todo.find({text: text}).then(function(todos){
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(function(e){
          done(e);
        })
      })
  });

  it('should not create todo with invalid body data', function(done){
    var text = '';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(400)
      .end(function(err, res){
        if (err){
          return done(err);
        }

        Todo.find().then(function(todos){
          expect(todos.length).toBe(2);
          done();
        }).catch(function(err){
          done(err);
        });
      });
  });
});

describe('GET /todos', function(){
  it('should get all todos', function(done){
    request(app)
      .get('/todos')
      .expect(200)
      .expect(function(res){
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', function(){
  it('should return todo doc', function(done){
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(function(res){
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', function(done){
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', function(done){
    var invalidId = 123;
    request(app)
      .get(`/todos/${invalidId}`)
      .expect(404)
      .end(done)
  });
});

describe('DELETE /todos/:id', function(){
  it('should remove a todo', function(done){
    var hexId = todos[0]._id.toHexString();
    console.log(hexId);

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(function(res){
        expect(res.body.todo._id).toBe(hexId);
      })
      .end(function(err, res){
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then(function(todo){
          expect(todo).toBeFalsy();
          done();
        }).catch(function(e){
          done(e);
        })
      })
  })
});

describe('GET /users/me', function(){
  it('should return user if authenticated', function(done){
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(function(res){
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it ('should return a 401 if not authenticated', function(done){
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(function(res){
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', function(){
  it('should create a user', function(done){
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect(function(res){
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(function(error){
        if (error){
          return done(error);
        }

        User.findOne({email}).then(function(user){
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        })
      });

  });

  it('should return validation errors if request invalid', function(done){
    request(app)
      .post('/users')
      .send({
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done)
  });

  it('should not create user if email in use', function(done){
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done)
  });
})
