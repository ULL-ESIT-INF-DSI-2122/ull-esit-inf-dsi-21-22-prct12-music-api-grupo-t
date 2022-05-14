import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';


export const postRouter = express.Router();

// Recibe peticiones para crear artistas
postRouter.post('/artist', (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genres: req.body.genres,
  });
  // Se almacenan los datos del artista
  artist.save().then((artist) => {
    res.status(201).send(artist);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


// Recibe peticiones para crear canciones
postRouter.post('/song', (req, res) => {
  Artist.findOne({name: req.body.author.toString()}).then((artist) => {
    if (!artist) {
      res.status(404).send({
        error: 'Artist not found',
      });
    } else {
      const song = new Song({
        name: req.body.name,
        author: artist,
        duration: req.body.duration,
        genres: req.body.genres,
        single: req.body.single,
        reproductions: req.body.reproductions,
      });
      // Se almacenan los datos de la canción
      song.save().then((song) => {
        artist.songs.push(song._id);
        artist.monthlyListeners += song.reproductions;

        artist.save().then(() => {
          res.status(201).send(song);
        }).catch((error) => {
          res.status(500).send(error);
        });
      }).catch((error) => {
        res.status(500).send(error);
      });
    }
  }).catch(() => {
    res.status(500).send();
  });
});