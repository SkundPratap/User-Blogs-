import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Blog from '../models/blog';

chai.use(chaiHttp).should();

describe('Blogs', () => {

  beforeEach(done => {
    Blog.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for blogs', () => {

    it('should get all the blogs', done => {
      chai.request(app)
        .get('/api/blogs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get blogs count', done => {
      chai.request(app)
        .get('/api/blogs/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new blog', done => {
      const blog = new Blog ({ title: 'this is the test title', description:'This is a test description', imageURL:'https://www.spotify.com' });
      chai.request(app)
        .post('/api/cat')
        .send(blog)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('title');
          res.body.should.have.a.property('description');
          res.body.should.have.a.property('imageURL');
          done();
        });
    });

    it('should get a cat by its id', done => {
      const blog = new Blog ({ title: 'this is the test title', description:'This is a test description', imageURL:'https://www.spotify.com' });
      blog.save((error, newBlog) => {
        chai.request(app)
          .get(`/api/blog/${newBlog.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('imageURL');
            res.body.should.have.property('_id').eql(newBlog.id);
            done();
          });
      });
    });

    it('should update a blog  by its id', done => {
      const blog = new Blog ({ title: 'this is the test title', description:'This is a test description', imageURL:'https://www.spotify.com' });
      blog.save((error, newBlog) => {
        chai.request(app)
          .put(`/api/blog/${newBlog.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a blog by its id', done => {
      const blog = new Blog ({ title: 'this is the test title', description:'This is a test description', imageURL:'https://www.spotify.com' });
      blog.save((error, newBlog) => {
        chai.request(app)
          .del(`/api/blog/${newBlog.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


