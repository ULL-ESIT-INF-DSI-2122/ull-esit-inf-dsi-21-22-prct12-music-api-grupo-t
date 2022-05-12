import {Genre} from './models/genre';
import {Song} from './models/song';
// import {Artist} from './models/artist';
import {MongoClient, ObjectID} from 'mongodb';
import {Document, connect, model, Schema} from 'mongoose';


connect('mongodb://127.0.0.1:27017/music-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});


interface ArtistDocumentInterface extends Document {
  name: string;
  // genres: Genre[];
  // songs: Song[];
  // listeners: number;
}

const ArtistSchema = new Schema<ArtistDocumentInterface>({
  name: {
    type: String,
  },
});

const Artist = model<ArtistDocumentInterface>('Artist', ArtistSchema);

const artist = new Artist({
  name: 'Juan',
});

artist.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});