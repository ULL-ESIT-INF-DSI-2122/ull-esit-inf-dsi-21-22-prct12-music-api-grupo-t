import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';


export const getRouter = express.Router();

// Recibe peticiones para obtener artistas por sus nombres
getRouter.get('/artist', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Artist.find(filter).then((artist) => {
    if (artist.length !== 0) {
      res.send(artist);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener canciones por sus nombres
getRouter.get('/song', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Song.find(filter).then((song) => {
    if (song.length !== 0) {
      res.send(song);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener playlists por sus nombres
getRouter.get('/playlist', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Playlist.find(filter).then((playlist) => {
    if (playlist.length !== 0) {
      res.send(playlist);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener un artista según su id
getRouter.get('/artist/:id', (req, res) => {
  Artist.findById(req.params.id).then((artist) => {
    if (!artist) {
      res.status(404).send();
    } else {
      res.send(artist);
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener una cancion según su id
getRouter.get('/song/:id', (req, res) => {
  Song.findById(req.params.id).then((song) => {
    if (!song) {
      res.status(404).send();
    } else {
      res.send(song);
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener una cancion según su id
getRouter.get('/playlist/:id', (req, res) => {
  Playlist.findById(req.params.id).then((playlist) => {
    if (!playlist) {
      res.status(404).send();
    } else {
      res.send(playlist);
    }
  }).catch(() => {
    res.status(500).send();
  });
});