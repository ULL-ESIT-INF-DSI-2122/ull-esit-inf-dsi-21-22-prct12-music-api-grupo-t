import * as express from 'express';
import {Artist} from '../models/artist';


export const patchRouter = express.Router();

// Recibe peticiones para actualizar un artista según su nombre
patchRouter.patch('/artists', (req, res) => {
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
patchRouter.patch('/artists/:id', (req, res) => {
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