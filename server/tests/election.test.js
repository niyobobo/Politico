import chai from 'chai';
import chaihttp from 'chai-http';
import chaiThing from 'chai-things';
import app from '..';

chai.should();
chai.use(chaihttp);
chai.use(chaiThing);

let adminToken;
before((done) => {
  const admin = {
    email: 'admin@gmail.com',
    password: '123456'
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

describe('Election end-point tests result', () => {
  it('Should create a candidate', (done) => {
    const officeId = 1;
    const candidate = {
      userId: 1,
      partyId: 1,
    };

    chai.request(app)
      .post('/api/v1/office/' + officeId + '/register')
      .send(candidate)
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('candidate', candidate.userId);
        res.body.data.should.all.have.property('party', candidate.partyId);
        res.body.data.should.all.have.property('office', officeId);
        done();
      });
  });

  it('Should VOTE a candidate', (done) => {
    const vote = {
      officeId: 1,
      candidateId: 1
    };

    chai.request(app)
      .post('/api/v1/votes')
      .send(vote)
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('voter');
        res.body.data.should.all.have.property('office', vote.officeId);
        res.body.data.should.all.have.property('candidate', vote.candidateId);
        done();
      });
  });

  it('Should return election decision', (done) => {
    const officeId = 1;

    chai.request(app)
      .get('/api/v1/office/' + officeId + '/result')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('Should make petition', (done) => {
    const petition = {
      office: 1,
      body: 'Test petition',
      evidence: 'Evidence1,Evidence2,Evidence3'
    };

    chai.request(app)
      .post('/api/v1/petitions')
      .set('access-token', adminToken)
      .send(petition)
      .end((_err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        res.body.data.should.all.have.property('createdby');
        res.body.data.should.all.have.property('office');
        res.body.data.should.all.have.property('body');
        res.body.data.should.all.have.property('evidence');
        done();
      });
  });
});
