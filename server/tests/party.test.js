import chai from 'chai';
import chaihttp from 'chai-http';
import chaiThing from 'chai-things';
import app from '..';

chai.should();
chai.use(chaihttp);
chai.use(chaiThing);

describe('Political Parties end-point tests result', () => {
  it('Should GET all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('name');
        res.body.data.should.all.have.property('hqAddress');
        res.body.data.should.all.have.property('logoUrl');
        res.body.data.should.all.have.property('representative');
        res.body.data.should.all.have.property('contact');
        res.body.data.should.all.have.property('website');
        res.body.data.should.all.have.property('created_at');
        done();
      });
  });

  it('Should POST (Create) a party', (done) => {
    const party = {
      name: 'Democratic',
      hqAddress: 'Washington, D.C.',
      logoUrl: 'https://www.stjoedemocrats.org/wp-content/uploads/2017/09/D-Logo-Only-small-300x230.jpg',
      representative: 'Tom Perez',
      contact: '+1(000)456-789-123',
      website: 'https://democrats.org/',
    };

    chai.request(app)
      .post('/api/v1/parties')
      .send(party)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('name', party.name);
        res.body.data.should.all.have.property('hqAddress', party.hqAddress);
        res.body.data.should.all.have.property('logoUrl', party.logoUrl);
        res.body.data.should.all.have.property('representative', party.representative);
        res.body.data.should.all.have.property('contact', party.contact);
        res.body.data.should.all.have.property('website', party.website);
        done();
      });
  });

  it('Should GET a party', (done) => {
    const party = { id: 200 };

    chai.request(app)
      .get('/api/v1/parties/' + party.id + '')
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('name');
        res.body.data.should.all.have.property('hqAddress');
        res.body.data.should.all.have.property('logoUrl');
        res.body.data.should.all.have.property('representative');
        res.body.data.should.all.have.property('contact');
        res.body.data.should.all.have.property('website');
        res.body.data.should.all.have.property('created_at');
        done();
      });
  });

  it('Should UPDATE a party', (done) => {
    const party = { id: 200 };
    const name = { name: 'Kigali' };

    chai.request(app)
      .patch('/api/v1/parties/' + party.id + '/name')
      .send(name)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('name');
        res.body.data.should.all.have.property('hqAddress');
        res.body.data.should.all.have.property('logoUrl');
        res.body.data.should.all.have.property('representative');
        res.body.data.should.all.have.property('contact');
        res.body.data.should.all.have.property('website');
        res.body.data.should.all.have.property('created_at');
        done();
      });
  });

  it('Should DELETE a party', (done) => {
    const party = { id: 200 };

    chai.request(app)
      .delete('/api/v1/parties/' + party.id + '')
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('message');
        done();
      });
  });
});
