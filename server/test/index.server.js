// killall -9 node
// const request = require('supertest');
// describe('loading express server', ()=>{
   
//     const server = require('../index');
    
//     it('should send a 200 for Get requests /', done => {
//         request(server)
//             .get('/')
//             .expect(200, done)
//     });
//     // test routes
//     // it('should send a 200 for the PUT requests /', done => {
//     //     request(server)
//     //         .put('/')
//     //         .expect(200, done)
//     // });
//     it('404 everything else', done => {
//         request(server)
//           .get('/foo/bar')
//           .expect(404, done);
//       });
//     //   server.close();
// });