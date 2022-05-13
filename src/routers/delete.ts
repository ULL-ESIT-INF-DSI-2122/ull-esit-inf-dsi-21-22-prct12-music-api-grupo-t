import * as express from 'express';
import {Artist} from '../models/artist';


export const deleteRouter = express.Router();

// Recibe peticiones de eliminación de artistas por su nombre
deleteRouter.delete('/artists', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Artist.findOneAndDelete({name: req.query.name.toString()}).then((artist) => {
      if (!artist) {
        res.status(404).send();
      } else {
        res.send(artist);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


// Recibe peticiones de eliminación de artistas por su id
deleteRouter.delete('/artists/:id', (req, res) => {
  Artist.findByIdAndDelete(req.params.id).then((artist) => {
    if (!artist) {
      res.status(404).send();
    } else {
      res.send(artist);
    }
  }).catch(() => {
    res.status(400).send();
  });
});
