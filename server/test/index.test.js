const request = require('supertest');
describe('loading express server', ()=>{
    it('should send a 200 for the /', done => {
        const server = require('../index');
        request(server)
            .get('/')
            .expect(200, done)
    });
    it('404 everything else', done => {
        const server = require('../index');
        request(server)
          .get('/foo/bar')
          .expect(404, done);
      });
});