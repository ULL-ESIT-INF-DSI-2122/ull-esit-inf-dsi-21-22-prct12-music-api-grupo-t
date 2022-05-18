import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';

/**
 * Contains all the functionability related to get items information
 */
export const getRouter = express.Router();

/**
 * Gets all the info from an artist by its name
 */
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


/**
 * Gets all the info from an song by its name
 */
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


/**
 * Gets all the info from a playlist by its name
 */
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


/**
 * Gets all the info from an artist by its id
 */
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


/**
 * Gets all the info from a song by its id
 */
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


/**
 * Gets all the info from a playlist by its id
 */
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