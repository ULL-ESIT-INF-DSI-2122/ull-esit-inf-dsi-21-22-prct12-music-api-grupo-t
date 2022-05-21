import * as express from 'express';
import {Playlist} from '../models/playlist';
import {Artist} from '../models/artist';
import {Song} from '../models/song';

/**
 * Contains all the functionability related to removing items
 */
export const deleteRouter = express.Router();

/**
 * Deletes an artist by his name
 */
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
        Song.deleteMany({_id: {$in: artist.songs}}).then((result) => {
          res.send({
            artist,
            deletedSongs: result.deletedCount,
          });
        }).catch(() => {
          res.status(500).send();
        });
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


/**
 * Deletes asong by its name
 */
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


/**
 * Deletes a playlist by its name
 */
deleteRouter.delete('/playlist', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Playlist.findOneAndDelete({name: req.query.name.toString()}).then((playlist) => {
      if (!playlist) {
        res.status(404).send();
      } else {
        res.send(playlist);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


/**
 * Deletes an artist by his id
 */
deleteRouter.delete('/artist/:id', (req, res) => {
  Artist.findByIdAndDelete(req.params.id).then((artist) => {
    if (!artist) {
      res.status(404).send();
    } else {
      Song.deleteMany({_id: {$in: artist.songs}}).then((result) => {
        res.send({
          artist,
          deletedSongs: result.deletedCount,
        });
      }).catch(() => {
        res.status(500).send();
      });
    }
  }).catch(() => {
    res.status(400).send();
  });
});


/**
 * Deletes a song by its id
 */
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


/**
 * Deletes a playlist by its id
 */
deleteRouter.delete('/playlist/:id', (req, res) => {
  Playlist.findByIdAndDelete(req.params.id).then((playlist) => {
    if (!playlist) {
      res.status(404).send();
    } else {
      res.send(playlist);
    }
  }).catch(() => {
    res.status(400).send();
  });
});