import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThing from 'chai-things';
import server from '../index'

chai.should();
chai.use(chaiHttp);
chai.use(chaiThing);

describe('User authantication end-point', () => {
    it('Should create an account', (done) => {
        const user = {
            firstname: 'Bobo',
            lastname: 'NIYO',
            othername: 'ynwa',
            email: 'bobo@gmail.com',
            phoneNumber: '0783282830',
            passportUrl: 'www.go.rw',
            password: '123456',
            isAdmin: true,
        }
        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                res.body.should.be.an('Object');
                res.body.should.have.property('status').equal(201);
                res.body.should.have.property('data');
                res.body.data.should.be.an('Array');
                res.body.data.should.all.have.property('token');
                res.body.data.should.all.have.property('user');
                res.body.data[0].user.should.have.property('firstname', user.firstname);
                res.body.data[0].user.should.have.property('lastname', user.lastname);
                res.body.data[0].user.should.have.property('othername', user.othername);
                res.body.data[0].user.should.have.property('email', user.email);
                res.body.data[0].user.should.have.property('phonenumber', user.phoneNumber);
                res.body.data[0].user.should.have.property('passporturl', user.passportUrl);
                res.body.data[0].user.should.have.property('isadmin', user.isAdmin);
                done();
            });
    });

    it('Should be able to login', (done) => {
        const login = {
            email: 'bobo@gmail.com',
            password: '123456',
        };
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(login)
            .end((err, res) => {
                res.body.should.be.an('Object');
                res.body.should.have.property('status').equal(200);
                res.body.should.have.property('data');
                res.body.data.should.be.an('Array');
                res.body.data.should.all.have.property('token');
                res.body.data.should.all.have.property('user');
                res.body.data[0].user.should.have.property('firstname');
                res.body.data[0].user.should.have.property('lastname');
                res.body.data[0].user.should.have.property('othername');
                res.body.data[0].user.should.have.property('email');
                res.body.data[0].user.should.have.property('phonenumber');
                res.body.data[0].user.should.have.property('passporturl');
                res.body.data[0].user.should.have.property('password');
                res.body.data[0].user.should.have.property('isadmin');
                done();
            });
    });
});