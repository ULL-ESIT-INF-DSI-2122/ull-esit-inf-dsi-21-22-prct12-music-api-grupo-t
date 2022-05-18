import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';

/**
 * Contains all the functionability related to modify items information
 */
export const patchRouter = express.Router();

/**
 * Modifies all the artist information, found by its name
 */
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


/**
 * Modifies all the artist information, found by its id
 */
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

/**
 * Modifies all the song information, found by its name
 */
patchRouter.patch('/song', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'duration', 'genre', 'single', 'reproductions'];
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

/**
 * Modifies all the song information, found by its id
 */
patchRouter.patch('/song/:id', (req, res) => {
  const allowedUpdates = ['name', 'duration', 'genre', 'single', 'reproductions'];
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

/**
 * Modifies all the playlist information, found by its name
 */
patchRouter.patch('/playlist', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'songs', 'genres'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Playlist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((playlist) => {
        if (!playlist) {
          res.status(404).send();
        } else {
          res.send(playlist);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

/**
 * Modifies all the playlist information, found by its id
 */
patchRouter.patch('/playlist/:id', (req, res) => {
  const allowedUpdates = ['name', 'songs', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((playlist) => {
      if (!playlist) {
        res.status(404).send();
      } else {
        res.send(playlist);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});