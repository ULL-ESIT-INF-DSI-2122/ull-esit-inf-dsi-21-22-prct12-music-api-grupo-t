import {Document, Schema, model} from 'mongoose';
import {SongDocumentInterface} from './song';
import {Genre} from './genre';

/**
 * This interface is where the Playlist schema is based
 */
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

/**
 * The final model for the Playlist database
 */
export const Playlist = model<PlaylistDocumentInterface>('Playlist', PlaylistSchema);