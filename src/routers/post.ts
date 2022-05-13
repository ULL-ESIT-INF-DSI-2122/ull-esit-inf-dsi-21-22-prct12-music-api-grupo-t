import * as express from 'express';
import {Artist} from '../models/artist';


export const postRouter = express.Router();

// Recibe peticiones para crear artistas
postRouter.post('/artists', (req, res) => {
  const artist = new Artist(req.body);

  artist.save().then((artist) => {
    res.status(201).send(artist);
  }).catch((error) => {
    res.status(400).send(error);
  });
});