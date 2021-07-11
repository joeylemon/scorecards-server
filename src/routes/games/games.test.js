import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { BASE_URL } from '../../utils/constants.js'

const api = supertest.agent(BASE_URL)

describe('Lists Endpoints', () => {
    it('should return an array of genders', done => {
        api
            .get('/lists/genders')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                res.body.should.be.Array()
                res.body[0].should.have.property('id')
                res.body[0].should.have.property('name')
                done()
            })
    })

    it('should return an array of roles', done => {
        api
            .get('/lists/roles')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                res.body.should.be.Array()
                res.body[0].should.have.property('id')
                res.body[0].should.have.property('name')
                done()
            })
    })

    it('should return an array of states', done => {
        api
            .get('/lists/states')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                res.body.should.be.Array()
                res.body.should.containEql('Tennessee')
                done()
            })
    })

    it('should return an array of cities', done => {
        api
            .get('/lists/cities/Tennessee')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                res.body.should.be.Array()
                res.body.should.containEql('Knoxville')
                done()
            })
    })
})
