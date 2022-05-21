import 'mocha';
import * as chai from 'chai';
import {expect} from 'chai';
import 'chai-http';

require('./post.spec.ts');
chai.use(require('chai-http'));
const url= 'http://localhost:3000';

describe('Petición PATCH', () => {
  it('Debe modificar un artista', (done) => {
    chai.request(url).patch('/artist?name=Artist1').send({
      name: 'Artist2',
      genres: [
        'Pop',
      ],
      monthlyListeners: 4,
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al modificar el artista');
      }
      expect(res).to.have.status(400);
      chai.request(url).patch('/artist?name=Artist1').send({
        name: 'Artist2',
        genres: [
          'Pop',
        ],
        monthlyListeners: 4,
      });
      done();
    });
  });
  it('Debe modificar una canción', (done) => {
    chai.request(url).patch('/song?name=Song1').send({
      name: 'Song2',
      author: "Artist1",
      reproductions: 8,
      single: true,
      duration: {min: 2, sec: 34},
      monthlyListeners: 5,
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al modificar la canción');
      }
      expect(res).to.have.status(501);
      chai.request(url).patch('/song?name=Song1').send({
        name: 'Song2',
        author: "Artist1",
        reproductions: 8,
        single: true,
        duration: {min: 2, sec: 34},
        monthlyListeners: 5,
      });
      done();
    });
  });
  it('Debe modificar una playlist', (done) => {
    chai.request(url).patch('/playlist?name=PlayList1').send({
      name: 'PlayList2',
      songs: [
        'Song1',
      ],
    }).end((err, res) => {
      if (err) {
        throw new Error('ERROR al modificar la playlist');
      }
      expect(res).to.have.status(501);
      chai.request(url).patch('/playlist?name=PlayList1').send({
        name: 'PlayList2',
        songs: [
          'Song1',
        ],
      });
      done();
    });
  });
});