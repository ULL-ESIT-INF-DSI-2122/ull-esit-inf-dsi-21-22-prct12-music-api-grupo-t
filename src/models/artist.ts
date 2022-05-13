import {Document, Schema, model} from 'mongoose';

interface ArtistDocumentInterface extends Document {
  name: string,
  genre: string[],
  songs: string[],
  monthlyListeners: number
}

const ArtistSchema = new Schema<ArtistDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
    enum: ['Pop', 'Rock', 'Trap', 'Rap', 'Heavy'],
  },
  songs: {
    type: String,
    trim: true,
  },
  monthlyListeners: {
    type: Number,
    default: 0,
  },
});

export const Artist = model<ArtistDocumentInterface>('Artist', ArtistSchema);