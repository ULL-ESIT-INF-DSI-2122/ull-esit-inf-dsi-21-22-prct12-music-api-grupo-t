import {Document, Schema, model} from 'mongoose';
import {ArtistDocumentInterface} from './artist';
import {Genre} from './genre';


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