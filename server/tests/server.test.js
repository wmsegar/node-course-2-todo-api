const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'First test todo'
},
{
  text: 'Second test todo'
}];

beforeEach(function(done){
  Todo.remove({}).then(function(){
    return Todo.insertMany(todos);
  }).then(function(){
    done();
  });
});

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
