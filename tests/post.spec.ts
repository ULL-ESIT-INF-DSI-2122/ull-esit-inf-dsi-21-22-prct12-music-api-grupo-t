import 'mocha';
import * as chai from 'chai';
import {expect} from 'chai';
import 'chai-http';


chai.use(require('chai-http'));
const url= 'http://localhost:3000';

describe('Peticiones POST: ', () => {
  it('Se debe poder insertar un Artista', (done) => {
    chai.request(url).post('/artist').send({
      name: 'Artist1',
      genres: [
        'Pop',
      ],
      monthlyListeners: 5,
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al insertar el artista');
      }
      expect(res).to.have.status(201);
      done();
    });
  });
  it('Se debe poder insertar una Cancion', (done) => {
    chai.request(url).post('/song').send({
      name: 'Song1',
      author: "Artist1",
      reproductions: 8,
      single: true,
      duration: {min: 2, sec: 34},
      monthlyListeners: 5,
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al insertar la canción');
      }
      expect(res).to.have.status(201);
      done();
    });
  });
  it('Se debe poder insertar una PlayList', (done) => {
    chai.request(url).post('/playlist').send({
      name: 'PlayList1',
      songs: [
        'Song1',
      ],
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al insertar la playlist');
      }
      expect(res).to.have.status(501);
      done();
    });
  });
});