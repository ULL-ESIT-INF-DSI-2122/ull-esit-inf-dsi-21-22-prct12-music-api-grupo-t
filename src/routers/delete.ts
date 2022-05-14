import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';


export const deleteRouter = express.Router();

// Recibe peticiones de eliminación de artistas por su nombre
deleteRouter.delete('/artist', (req, res) => {
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


// Recibe peticiones de eliminación de canciones por su nombre
deleteRouter.delete('/song', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Song.findOneAndDelete({name: req.query.name.toString()}).then((song) => {
      if (!song) {
        res.status(404).send();
      } else {
        Artist.findById(song.author).then((artist) => {
          if (!artist) {
            res.status(404).send();
          } else {
            const index = artist.songs.indexOf(song._id);
            artist.songs.splice(1, index);
            artist.monthlyListeners -= song.reproductions;

            artist.save().then(() => {
              res.send(song);
            }).catch((error) => {
              res.status(500).send(error);
            });
          }
        }).catch((error) => {
          res.status(500).send(error);
        });
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


// Recibe peticiones de eliminación de artistas por su id
deleteRouter.delete('/artist/:id', (req, res) => {
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


// Recibe peticiones de eliminación de canciones por su id
deleteRouter.delete('/song/:id', (req, res) => {
  Song.findByIdAndDelete(req.params.id).then((song) => {
    if (!song) {
      res.status(404).send();
    } else {
      Artist.findById(song.author).then((artist) => {
        if (!artist) {
          res.status(404).send();
        } else {
          const index = artist.songs.indexOf(song._id);
          artist.songs.splice(1, index);
          artist.monthlyListeners -= song.reproductions;

          artist.save().then(() => {
            res.send(song);
          }).catch((error) => {
            res.status(500).send(error);
          });
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }).catch(() => {
    res.status(400).send();
  });
});