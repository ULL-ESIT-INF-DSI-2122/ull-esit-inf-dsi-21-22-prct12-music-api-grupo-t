import 'mocha';
import * as chai from 'chai';
import {expect} from 'chai';
import 'chai-http';


chai.use(require('chai-http'));
const url= 'http://localhost:3000';

describe('Peticiones GET', () => {
  it('Debe obtener todas los artistas', (done) => {
    chai.request(url).get('/artist').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener los artistas');
      }
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Debe obtener todas las canciones', (done) => {
    chai.request(url).get('/song').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener las canciones');
      }
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Debe obtener todas las playlists', (done) => {
    chai.request(url).get('/song').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener las playlists');
      }
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Debe obtener un artista determinado', (done) => {
    chai.request(url).get('/artist?name=Artist1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener el artista');
      }
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Debe obtener una canción determinada', (done) => {
    chai.request(url).get('/song?name=Song1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener la canción');
      }
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Debe obtener una playlist determinada', (done) => {
    chai.request(url).get('/playlist?name=PlayList1').end((err, res) => {
      if (err) {
        throw new Error('ERROR al obtener la playlist');
      }
      expect(res).to.have.status(404);
      done();
    });
  });
});