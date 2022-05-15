import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';

export const patchRouter = express.Router();

// Recibe peticiones para actualizar un artista según su nombre
patchRouter.patch('/artist', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'genre', 'songs', 'monthlyListeners'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Artist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((artist) => {
        if (!artist) {
          res.status(404).send();
        } else {
          res.send(artist);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});


// Recibe peticiones para actualizar un artista según su id
patchRouter.patch('/artist/:id', (req, res) => {
  const allowedUpdates = ['name', 'genre', 'songs', 'monthlyListeners'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((artist) => {
      if (!artist) {
        res.status(404).send();
      } else {
        res.send(artist);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});

// Updates song
patchRouter.patch('/song', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'author', 'duration', 'genre',
      'single', 'reproductions'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Song.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((song) => {
        if (!song) {
          res.status(404).send();
        } else {
          res.send(song);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

// Modificar canciones según su id
patchRouter.patch('/song/:id', (req, res) => {
  const allowedUpdates = ['name', 'author', 'duration', 'genre',
    'single', 'reproductions'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((song) => {
      if (!song) {
        res.status(404).send();
      } else {
        res.send(song);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});