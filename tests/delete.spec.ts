import 'mocha';
import * as chai from 'chai';
import {expect} from 'chai';
import 'chai-http';

require('./post.spec.ts');
chai.use(require('chai-http'));
const url= 'http://localhost:3000';

describe('Petición DELETE', () => {
  it('Debe borrar un artista', (done) => {
    chai.request(url).del('/artist?name=Artist1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al borrar el artista');
      }
      expect(res).to.have.status(200);
      chai.request(url).get('/artist?name=Artist1').end((err, res) => {
        if (err) {
          throw new Error('ERROR al borrar el artista');
        }
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  it('Debe borrar una canción', (done) => {
    chai.request(url).del('/song?name=Song1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al borrar la canción');
      }
      expect(res).to.have.status(404);
      chai.request(url).get('/song?name=Song1').end((err, res) => {
        if (err) {
          throw new Error('ERROR al borrar la canción');
        }
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  it('Debe borrar una playlist', (done) => {
    chai.request(url).del('/playlist?name=PlayList1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al borrar la playlist');
      }
      expect(res).to.have.status(501);
      chai.request(url).get('/playlist?name=PlayList1').end((err, res) => {
        if (err) {
          throw new Error('ERROR al borrar la playlist');
        }
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
