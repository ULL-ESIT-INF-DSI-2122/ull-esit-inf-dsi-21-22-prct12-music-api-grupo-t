import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';

export const patchRouter = express.Router();

// Recibe peticiones para actualizar un artista según su nombre
// patchRouter.patch('/artist', (req, res) => {
//   if (!req.query.name) {
//     res.status(400).send({
//       error: 'A name must be provided',
//     });
//   } else {
//     Artist.find({name: req.query.name}).then((artistName) => {
//       if (artistName.length !== 0) {
//         res.status(409).send();
//       } else {
//         const allowedUpdates = ['name', 'genre', 'songs', 'monthlyListeners'];
//         const actualUpdates = Object.keys(req.body);
//         const isValidUpdate =
//           actualUpdates.every((update) => allowedUpdates.includes(update));
//         if (!isValidUpdate) {
//           res.status(400).send({
//             error: 'Update is not permitted',
//           });
//         } else {
//           Artist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
//             new: true,
//             runValidators: true,
//           }).then((artist) => {
//             if (!artist) {
//               res.status(404).send();
//             } else {
//               res.send(artist);
//             }
//           }).catch((error) => {
//             res.status(400).send(error);
//           });
//         }
//       }
//     }).catch(() => {
//       res.status(500).send();
//     });
//   }
// });

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
    const actualName = req.query.name.toString();
    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Artist.findById(req.body.name.toString()).then((artistName) => {
        if (!artistName) {
          Artist.findOneAndUpdate({name: actualName}, req.body, {
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
        } else {
          res.status(400).send({
            error: 'That artist already exists',
          });
        }
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
    Artist.findById(req.body.name.toString()).then((artistName) => {
      if (!artistName) {
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
      } else {
        res.status(400).send({
          error: 'That artist already exists',
        });
      }
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
    const allowedUpdates = ['name', 'duration', 'genre', 'single', 'reproductions'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));
    const actualName = req.query.name as String;

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Song.findById(req.body.name.toString()).then((songName) => {
        if (!songName) {
          Song.findOneAndUpdate(actualName, req.body, {
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
        } else {
          res.status(400).send({
            error: 'That song already exists',
          });
        }
      });
    }
  }
});

// Modificar canciones según su id
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
    // Song.findById(req.body.name.toString()).then((songName) => {
    //   if (!songName) {
    //     Song.findByIdAndUpdate(req.params.id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     }).then((song) => {
    //       if (!song) {
    //         res.status(404).send();
    //       } else {
    //         res.send(song);
    //       }
    //     }).catch((error) => {
    //       res.status(400).send(error);
    //     });
    //     }
    // }
  }
});

// Updates playlist
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
    const actualName = req.query.name as String;

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Playlist.findById(req.body.name.toString()).then((playlistName) => {
        if (!playlistName) {
          Playlist.findOneAndUpdate(actualName, req.body, {
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
        } else {
          res.status(400).send({
            error: 'That playlist already exists',
          });
        }
      });
    }
  }
});

// Modificar playlist según su id
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
    Playlist.findById(req.body.name.toString()).then((playlistName) => {
      if (!playlistName) {
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
      } else {
        res.status(400).send({
          error: 'That playlist already exists',
        });
      }
    });
  }
});