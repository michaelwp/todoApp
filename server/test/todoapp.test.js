const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { t } = require('localizify');
const app = require('../main');
const { auth } = require('../model');

chai.use(chaiHttp);
chai.should();

let userId = '';
let token = '';
let id = '';

describe('Auth API tests', () => {
  after((done) => {
    auth
      .findByIdAndDelete(userId)
      .then((response) => {
        done();
      })
      .catch();
  });

  describe('POST /register', () => {
    it(`'should return ${t('registered {n}', { n: t('successfully') })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/register')
        .set('Accept-Language', 'id')
        .send({
          name: 'tes',
          email: 'tetes@mail.com',
          password: 'P@ssw0rd',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.contains(t('registered {n}', { n: t('successfully') }));
          userId = res.body.data.id;
          done();
        });
    });
  });

  describe('POST /register', () => {
    it(`'should return ${t('{n} already registered', { n: 'email' })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/register')
        .set('Accept-Language', 'id')
        .send({
          name: 'tes',
          email: 'tetes@mail.com',
          password: 'P@ssw0rd',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('{n} already registered', { n: 'email' }));
          done();
        });
    });
  });

  describe('POST /login', () => {
    it(`'should return ${t('login {n}', { n: t('successfully') })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('Accept-Language', 'id')
        .send({
          email: 'tetes@mail.com',
          password: 'P@ssw0rd',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('login {n}', { n: t('successfully') }));
          res.body.data.should.have.property('token');
          token = res.body.data.token;
          done();
        });
    });
  });

  describe('POST /login', () => {
    it(`'should return ${t('{n}, not found', { n: `email/${t('password')}` })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('Accept-Language', 'id')
        .send({
          email: 'fail@mail.com',
          password: 'P@ssw0rd',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('{n}, not found', { n: `email/${t('password')}` }));

          done();
        });
    });
  });
});

describe('todo API tests', () => {
  describe('POST /', () => {
    it(`should return ${t('created {n}', { n: t('successfully') })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/todo')
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .send({
          title: 'todo4 example',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.contains(t('created {n}', { n: t('successfully') }));
          done();
        });
    });
  });

  describe('POST /', () => {
    it(`should return ${t('{n} already registered', { n: 'title' })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/todo')
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .send({
          title: 'todo4 example',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('{n} already registered', { n: 'title' }));
          done();
        });
    });
  });

  describe('POST /', () => {
    it(`should return ${t('{n} already registered', { n: 'title' })}`, (done) => {
      chai
        .request(app)
        .post('/api/v1/todo')
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .send({
          title: 'todo4 example',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('{n} already registered', { n: 'title' }));
          done();
        });
    });
  });

  describe('GET /user', () => {
    it(`should return todo list`, (done) => {
      chai
        .request(app)
        .get('/api/v1/todo/user?q=to&filter=all')
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.have.lengthOf.above(0);
          id = res.body.data[0]._id;
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it(`should return todo item`, (done) => {
      chai
        .request(app)
        .get(`/api/v1/todo/${id}`)
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).not.to.be.undefined;
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it(`should return ${t('updated {n}', { n: t('successfully') })}`, (done) => {
      chai
        .request(app)
        .put(`/api/v1/todo/${id}`)
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .send({
          title: 'todo 21',
          status: 'done',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('updated {n}', { n: t('successfully') }));
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it(`should return ${t('{n} is required', { n: t('Title') })}`, (done) => {
      chai
        .request(app)
        .put(`/api/v1/todo/${id}`)
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.contains(t('{n} is required', { n: t('Title') }));
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it(`should return ${t('{n} is required', { n: t('Status') })}`, (done) => {
      chai
        .request(app)
        .put(`/api/v1/todo/${id}`)
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .send({
          title: 'todo 21',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.contains(t('{n} is required', { n: t('Status') }));
          done();
        });
    });
  });

  describe('DELETE /:id', () => {
    it(`should return ${t('deleted {n}', { n: t('successfully') })}`, (done) => {
      chai
        .request(app)
        .delete(`/api/v1/todo/${id}`)
        .set('Accept-Language', 'id')
        .set('Authorization', `token ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.contains(t('deleted {n}', { n: t('successfully') }));
          done();
        });
    });
  });
});
