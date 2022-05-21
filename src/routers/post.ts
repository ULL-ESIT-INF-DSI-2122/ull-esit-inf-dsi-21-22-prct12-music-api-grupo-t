import * as express from 'express';
import {Playlist} from '../models/playlist';
import {Artist} from '../models/artist';
import {Song} from '../models/song';

/**
 * Contains all the functionality to store items in the database
 */
export const postRouter = express.Router();

/**
 * Stores an artist with all its data in the database
 */
postRouter.post('/artist', (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genres: req.body.genres,
  });
  artist.save().then((artist) => {
    res.status(201).send(artist);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


/**
 * Stores a song with all its data in the database
 */
postRouter.post('/song', (req, res) => {
  if (!req.body.author) {
    res.status(400).send({
      error: 'An author for the song must be provided',
    });
  } else {
    Artist.findOne({name: req.body.author.toString()}).then((artist) => {
      if (!artist) {
        res.status(404).send({
          error: 'Artist not found',
        });
      } else {
        const song = new Song({
          name: req.body.name,
          author: artist,
          duration: req.body.duration,
          genres: req.body.genres,
          single: req.body.single,
          reproductions: req.body.reproductions,
        });
        // Se almacenan los datos de la canción
        song.save().then((song) => {
          artist.songs.push(song._id);
          artist.monthlyListeners += song.reproductions;

          artist.save().then(() => {
            res.status(201).send(song);
          }).catch((error) => {
            res.status(500).send(error);
          });
        }).catch((error) => {
          res.status(500).send(error);
        });
      }
    }).catch((error) => {
      res.status(500).send(error);
    });
  }
});


/**
 * Stores a playlist with all its data in the database
 */
postRouter.post('/playlist', (req, res) => {
  if (!req.body.name || !req.body.songs) {
    res.status(400).send({
      error: 'Name and songs must be provided for the playlist',
    });
  } else if (Array.isArray(req.body.songs) &&
      req.body.songs.every((song: unknown) => typeof song === 'string')) {
    const newPlaylist = new Playlist({
      name: req.body.name,
      genres: req.body.genres,
    });

    let fullSec = 0;
    const songs: string[] = req.body.songs;
    let ignored = false;

    songs.forEach((song) => {
      Song.findOne({name: song}).then((foundSong) => {
        if (foundSong) {
          newPlaylist.songs.push(foundSong);
          fullSec += foundSong.duration.sec + foundSong.duration.min * 60;
        } else {
          ignored = true;
        }
        if (song === songs[songs.length - 1]) {
          newPlaylist.duration = {min: Math.floor(fullSec / 60), sec: fullSec % 60};
          newPlaylist.save().then((playlist) => {
            if (!ignored) {
              res.status(201).send(playlist);
            } else {
              res.status(201).send({
                warning: "Some songs were not found",
                playlist,
              });
            }
          }).catch((error) => {
            res.status(500).send(error);
          });
        }
      }).catch((error) => {
        res.status(500).send(error);
      });
    });
  } else {
    res.status(400).send({
      error: 'Songs must be provided as names',
    });
  }
});