import {Document, Schema, model} from 'mongoose';
import {SongDocumentInterface} from './song';
import {Genre} from './genre';

/**
 * This interface is where the Artist schema is based
 */
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
    unique: true,
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

/**
 * The final model for the Artist database
 */
export const Artist = model<ArtistDocumentInterface>('Artist', ArtistSchema);