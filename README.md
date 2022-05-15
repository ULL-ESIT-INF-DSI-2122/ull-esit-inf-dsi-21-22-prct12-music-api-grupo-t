# Práctica 12 - API Node/Express de gestión de información musical

### Desarrollo de Sistemas Informáticos - Universidad de La Laguna

#### Miembros:
* Tanausú Falcón Casanova
* Juan Marrero Domínguez
* Diego Rodríguez Pérez

## 1. Introducción
Se propone la implementación de un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de canciones, artistas y playlists. Los modelos de datos están alojados en el directorio *src/models*. Las diferentes opciones de modificado, borrado, etc se encuentran en el directorio *src/routers*. En cuanto a la documentación se ha generado mediante *TypeDoc*. Para verla simplemente tendremos que acceder al directorio *docs* y abrir el fichero *index.html*.

## 2. Objetivos

La realización de esta práctica tiene como objetivo aprender:

- La utilización de *node.js*.
- Utilizar los módulos de *MongoDB*.
- Comunicarse a través de *GitHub Issues*.

## 3. Implementación

Vamos a dividir la implementación en modelos de datos y en routers. En los modelos de datos definiremos las entidades pedidas en la práctica, y los routers los utilizaremos para implementar las funcionalidades requeridas en realación a estos modelos.

### Modelo de Datos 1 - Géneros Musicales (*Genre*)
#### Código
```ts
export type Genre =
  "Rap" | "Pop" | "Trap" | "Electro" | "Classic" | "Reggaeton" | "Rock" |
  "Country" | "Popular" | "Blues" | undefined
```
#### Explicación
En este modelo de datos se representa la información relativa a los Géneros Musicales. En este caso se definen simplemente los tipos de géneros musicales existentes.

### Modelo de Datos 2 - Canciones (*Song*)
#### Código
```ts
export interface SongDocumentInterface extends Document {
  name: string,
  author: ArtistDocumentInterface,
  duration: {min: number, sec: number},
  genre: Genre[],
  single: boolean,
  reproductions: number
}

const SongSchema = new Schema<SongDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId, ref: 'Artist',
    required: true,
  },
  duration: {
    type: {min: Number, sec: Number},
    default: {min: 0, sec: 0},
  },
  genre: {
    type: String,
    trim: true,
    enum: [
      "Rap", "Pop", "Trap", "Electro", "Classic", "Reggaeton",
      "Rock", "Country", "Popular", "Blues", undefined,
    ],
  },
  single: {
    type: Boolean,
    default: true,
  },
  reproductions: {
    type: Number,
    default: 0,
  },
});

export const Song = model<SongDocumentInterface>('Song', SongSchema);
```

#### Explicación
En este modelo de datos se representa la información relativa a las Canciones. Cada canción cuenta con los siguientes atributos:
* **name**: Contiene el nombre de la canción.
* **author**: Contiene el nombre del artista.
* **duration**: Duración de la canción.
* **genre**: Género(s) de la canción.
* **isSingle**: Información sobre si la canción es un *Single* o no.
* **views**: Reproducciones totales de la canción.


### Modelo de Datos 3 - Artistas (*Artist*)
#### Código
```ts
import {Document, Schema, model} from 'mongoose';
import {SongDocumentInterface} from './song';
import {Genre} from './genre';

export interface ArtistDocumentInterface extends Document {
  name: string,
  genres: Genre[],
  songs: SongDocumentInterface[],
  monthlyListeners: number
}

const ArtistSchema = new Schema<ArtistDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genres: [
    {
      type: String,
      trim: true,
      enum: [
        "Rap", "Pop", "Trap", "Electro", "Classic", "Reggaeton",
        "Rock", "Country", "Popular", "Blues", undefined,
      ],
    },
  ],
  songs: [
    {
      type: Schema.Types.ObjectId, ref: 'Song',
    },
  ],
  monthlyListeners: {
    type: Number,
    default: 0,
  },
});

export const Artist = model<ArtistDocumentInterface>('Artist', ArtistSchema);
```

#### Explicación
En este modelo de datos se representa la información relativa a los Artistas. Cada artista cuenta con los siguientes atributos:
* **name**: Contiene el nombre del artista.
* **genre**: Género(s) del artista.
* **songs** Canciones del artista
* **monthlyListeners**: Oyentes mensuales del artista.

### Modelo de Datos 4 - PlayLists (*PlayList*)
#### Código
```ts
import {Document, Schema, model} from 'mongoose';
import {SongDocumentInterface} from './song';
import {Genre} from './genre';

interface PlaylistDocumentInterface extends Document {
  name: string,
  genres: Genre[],
  songs: SongDocumentInterface[],
  duration: {min: number, sec: number},
}

const PlaylistSchema = new Schema<PlaylistDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genres: [
    {
      type: String,
      trim: true,
      enum: [
        "Rap", "Pop", "Trap", "Electro", "Classic", "Reggaeton",
        "Rock", "Country", "Popular", "Blues", undefined,
      ],
    },
  ],
  songs: [
    {
      type: Schema.Types.ObjectId, ref: 'Song',
    },
  ],
  duration: {
    type: {min: Number, sec: Number},
    default: {min: 0, sec: 0},
  },
});

export const Playlist = model<PlaylistDocumentInterface>('Playlist', PlaylistSchema);
```

#### Explicación
En este modelo de datos se representa la información relativa a las PlayLists. Cada playlist cuenta con los siguientes atributos:
* **name**: Contiene el nombre de la playlist.
* **genre**: Género(s) de la playlist.
* **songs** Canciones de la playlist
* **duration**: Duración total de la playlist.

### Router Post 
#### Código
```ts
import * as express from 'express';
import {Playlist} from '../models/playlist';
import {Artist} from '../models/artist';
import {Song} from '../models/song';


export const postRouter = express.Router();

// Recibe peticiones para crear artistas
postRouter.post('/artist', (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genres: req.body.genres,
  });
  // Se almacenan los datos del artista
  artist.save().then((artist) => {
    res.status(201).send(artist);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


// Recibe peticiones para crear canciones
postRouter.post('/song', (req, res) => {
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
});


// Recibe peticiones para crear playlists
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
```

#### Explicación
Se ejecuta mediante una petición **POST**.
En este router se desarrolla el código para crear los siguientes elementos:
* **Artistas**: Hay que indicar el nombre y los géneros.
* **Canciones**: Hay que indicar el nombre, el autor, la duración, los géneros, si es single y las reproducciones.
* **PlayLists**: Hay que indicar el nombre, las canciones y los géneros.

### Router Get
#### Código
```ts
import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';


export const getRouter = express.Router();

// Recibe peticiones para obtener artistas por sus nombres
getRouter.get('/artist', (req, res) => {
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


// Recibe peticiones para obtener canciones por sus nombres
getRouter.get('/song', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Song.find(filter).then((song) => {
    if (song.length !== 0) {
      res.send(song);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener playlists por sus nombres
getRouter.get('/playlist', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Playlist.find(filter).then((playlist) => {
    if (playlist.length !== 0) {
      res.send(playlist);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener un artista según su id
getRouter.get('/artist/:id', (req, res) => {
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


// Recibe peticiones para obtener una cancion según su id
getRouter.get('/song/:id', (req, res) => {
  Song.findById(req.params.id).then((song) => {
    if (!song) {
      res.status(404).send();
    } else {
      res.send(song);
    }
  }).catch(() => {
    res.status(500).send();
  });
});


// Recibe peticiones para obtener una cancion según su id
getRouter.get('/playlist/:id', (req, res) => {
  Playlist.findById(req.params.id).then((playlist) => {
    if (!playlist) {
      res.status(404).send();
    } else {
      res.send(playlist);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
```

#### Explicación
Se ejecuta mediante una petición **GET**.
En este router se desarrolla el código para obtener la información de los siguientes elementos:
* **Artistas**: Se obtiene la información indicando el nombre o el id. Para el nombre `/artist?name="..."`. Para el id `/artist?id="..."`.
* **Canciones**: Se obtiene la información indicando el nombre o el id. Para el nombre `/song?name="..."`. Para el id `/song?id="..."`.
* **PlayLists**: Se obtiene la información indicando el nombre o el id. Para el nombre `/playlist?name="..."`. Para el id `/playlist?id="..."`.

### Router Delete
#### Código
```ts
import * as express from 'express';
import {Playlist} from '../models/playlist';
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


// Recibe peticiones de eliminación de playlists por su nombre
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


// Recibe peticiones de eliminación de artistas por su id
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


// Recibe peticiones de eliminación de playlists por su id
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
```

#### Explicación
Se ejecuta mediante una petición **DELETE**.
En este router se desarrolla el código para eliminar los siguientes elementos:
* **Artistas**: Se elimina el artista indicando el nombre o el id. Para el nombre `/artist?name="..."`. Para el id `/artist?id="..."`.
* **Canciones**: Se elimina la canción indicando el nombre o el id. Para el nombre `/song?name="..."`. Para el id `/song?id="..."`.
* **PlayLists**: Se elimina la playlist indicando el nombre o el id. Para el nombre `/playlist?name="..."`. Para el id `/playlist?id="..."`.

### Router Patch
#### Código
```ts
import * as express from 'express';
import {Artist} from '../models/artist';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';

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
```

#### Explicación
Se ejecuta mediante una petición **PATCH**.
En este router se desarrolla el código para modificar información de los siguientes elementos:
* **Artistas**: Se modifica el artista indicando el nombre o el id. Para el nombre `/artist?name="..."`. Para el id `/artist?id="..."`. Se incluye en el *JSON* de la petición la información del artista que se va a modificar.
* **Canciones**: Se modifica la canción indicando el nombre o el id. Para el nombre `/song?name="..."`. Para el id `/song?id="..."` Se incluye en el *JSON* de la petición la información de la canción que se va a modificar.
* **PlayLists**: Se elimina la playlist indicando el nombre o el id. Para el nombre `/playlist?name="..."`. Para el id `/playlist?id="..."` Se incluye en el *JSON* de la petición la información de la playlist que se va a modificar.
