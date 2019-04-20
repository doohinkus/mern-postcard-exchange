const request = require('supertest');
describe('loading express server', ()=>{
   
    const server = require('../index');
    
    it('should send a 200 for Get requests /', done => {
        request(server)
            .get('/')
            .expect(200, done)
    });
    it('should send a 200 for the PUT requests /', done => {
        request(server)
            .put('/')
            .expect(200, done)
    });
    it('should send a 200 for the DELETE requests /', done => {
        request(server)
            .delete('/')
            .expect(200, done)
    });
    it('should send a 200 for the POST requests /', done => {
        request(server)
            .post('/')
            .expect(200, done)
    });
    it('404 everything else', done => {
        request(server)
          .get('/foo/bar')
          .expect(404, done);
      });
});