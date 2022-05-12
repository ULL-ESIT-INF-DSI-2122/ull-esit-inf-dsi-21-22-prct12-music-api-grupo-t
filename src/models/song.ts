import {Genre} from './genre';
import {Artist} from './artist';


/**
 * Type that shows the duration of a song in the 'minute:second'
 * format
 */
export type Duration = {
  minutes: number,
  seconds: number
}

/*
 * Song class that represents all the songs
 */
export class Song {
  /**
   * Constructor
   * @param name of the song
   * @param author of the song
   * @param duration of the song
   * @param genres of the song
   * @param isSingle boolean that shows if the songs is a single
   * @param views of the song
   */
  constructor(private name: string, private author: Artist,
    private duration: Duration = {minutes: 0, seconds: 0}, private genres: Genre[] = [],
    private isSingle: boolean = true, private views: number = 0) {}

  /**
   * @returns the name of the song
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the author of the song
   */
  public getAuthor() {
    return this.author;
  }

  /**
   * @returns the duration of the song
   */
  public getDuration(): Duration {
    return this.duration;
  }

  /**
   * @returns the genre of the song
   */
  public getGenres() {
    return this.genres;
  }

  /**
   * @returns if the song is a single
   */
  public getIsSingle() {
    return this.isSingle;
  }

  /**
   * @returns the views of the song
   */
  public getViews() {
    return this.views;
  }

  /**
   * Changes de name of the song
   * @param name that will be updated
   */
  public setName(name: string) {
    this.name = name;
  }

  /**
   * Changes de author of the song
   * @param author that will be updated
   */
  public setAuthor(author: Artist) {
    this.author = author;
  }

  /**
   * Changes de duration of the song
   * @param duration that will be updated
   */
  public setDuration(duration: Duration) {
    this.duration = duration;
  }

  /**
   * Changes de genres of the song
   * @param genres that will be updated
   */
  public setGenres(genres: Genre[]) {
    this.genres = genres;
  }

  /**
   * Changes de isSigle of the song
   * @param isSigle that will be updated
   */
  public setIsSingle(isSigle: boolean) {
    this.isSingle = isSigle;
  }

  /**
   * Changes de views of the song
   * @param views that will be updated
   */
  public setViews(views: number) {
    this.views = views;
  }

  /**
   * Removes a genre from a song
   * @param genreName name of the genre that will be removed
   */
  public removeGenre(genreName: Genre): void {
    this.genres.forEach((genre, i) => {
      if (genre === genreName) {
        this.genres.splice(i, 1);
      }
    });
  }

  /**
   * Returns the information of the song as a string
   */
  public asString(): string {
    let genresString = '';
    this.genres.forEach((genre) => {
      genresString += `${genre} `;
    });
    let formatedSong = `${this.name} - Author: ${this.author}, Duration: ${this.duration.minutes}:${this.duration.seconds}, ` +
      `Views: ${this.views}, Genres: ${genresString}`;
    return formatedSong;
  }
}