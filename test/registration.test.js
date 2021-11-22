process.env.NODE_ENV = 'test';


//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app.js'

let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Registrations', () => {

  describe('/POST register', () => {
    it('it should create the new registration', (done) => {
        let param = {
            "teacher": "teacherken@gmail.com",
            "students":
              [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
              ]
          }
      chai.request(app)
          .post('/api/register')
          .send(param)
          .end((err, res) => {
                res.should.have.status(204);
            done();
          });
    });
  });

  /*
  * Test the /GET commonstudents route
  */
  describe('/GET commonstudents', () => {
    it('it should GET all the commonstudents', (done) => {
      chai.request(app)
          .get('/api/commonstudents?teacher=teacherken@example.com')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('students')
            done();
          });
    });
  });

  describe('/POST suspend', () => {
    it('it should suspend the given student', (done) => {
        let student = {
            "student" : "studenthon@gmail.com"
          }
      chai.request(app)
          .post('/api/suspend')
          .send(student)
          .end((err, res) => {
                res.should.have.status(204);
            done();
          });
    });
  });

  describe('/POST notification', () => {
    it('it should return the student list', (done) => {
        let param = {
            "teacher":  "teacherken@gmail.com",
            "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
          }
      chai.request(app)
          .post('/api/retrievefornotifications')
          .send(param)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('recipients')
            done();
          });
    });
  });

});