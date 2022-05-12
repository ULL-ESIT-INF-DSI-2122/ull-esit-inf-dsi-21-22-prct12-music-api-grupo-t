import {Song} from './song';
import {Genre} from './genre';


/**
 * Artist class. Represents the owner of songs, albumns and members of a group
 * potentially
 */
export class Artist {
  /**
   * Stores the monthly listeners of this artist, calculated in the constructor. Takes into
   * account the songs of the group that the artist is member aswell.
   */
  private monthlyListeners: number;

  /**
   * Constructor
   * @param name of the artist
   * @param genres of the songs of the artist
   * @param publishedSongs stores the songs that the artist has published
   */
  constructor(private name: string, private genres: Genre[] = [],
    private publishedSongs: Song[] = []) {
    let listeners = 0;
    // Counts the views of all of the artist`s songs
    this.publishedSongs.forEach((song) => {
      listeners += song.getViews();
    });
    this.monthlyListeners = listeners;
  }

  /**
   * @returns the name of the artist
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the genres of the songs that the artist has made
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * @returns the songs of the artist
   */
  public getSongs(): Song[] {
    return this.publishedSongs;
  }

  /**
   * @returns all the songs that the artist has realeased as a string
   */
  public getPublishedSongs(): string[] {
    let songsNames: string[] = [];
    this.publishedSongs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }

  /**
   * @returns the number of the monthly listeners of the artist
   */
  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }

  /**
   * Add's a song to the artist
   * @param song that will be added
   */
  public addPublishedSong(song: Song) {
    this.publishedSongs.push(song);
  }

  /**
   * Add's an album to the artist
   * @param genre that will be added
   */
  public addGenre(genre: Genre) {
    this.genres.push(genre);
  }

  /**
   * Removes a genre from an artist
   * @param genreName genre to remove
   */
  public removeGenre(genreName: Genre): void {
    this.genres.forEach((genre, i) => {
      if (genre === genreName) {
        this.genres.splice(i, 1);
      }
    });
  }

  /**
   * Removes a song from an artist
   * @param songName song to remove
   */
  public removeSong(songName: string): void {
    for (let i = 0; i < this.publishedSongs.length; i++) {
      if (this.publishedSongs[i].getName() === songName) {
        console.log(this.publishedSongs[i]);
        delete(this.publishedSongs[i]);
      }
    }
  }
}