import * as express from 'express';
import {Artist} from '../models/artist';


export const getRouter = express.Router();

// Recibe peticiones para obtener artistas por sus nombres
getRouter.get('/artists', (req, res) => {
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


// Recibe peticiones para obtener un artista según su id
getRouter.get('/artists/:id', (req, res) => {
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