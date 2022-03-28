import {Pokemon} from '../ejercicio-1/pokemon';
import {pokeType} from '../ejercicio-1/pokemon';

/**
 * Stores an entry with the information related to Pokemons
 */
type entryPokedex = [name: string, type: pokeType, weight: number, height: number,
    attack: number, defense: number, speed: number, hitPoints: number];

/**
 * Class Pokedex that stores the entries with information about Pokemons
 */
export class Pokedex {
  public entries: entryPokedex[] = [];

  constructor(...entries: entryPokedex[]) {
    entries.forEach((entry) => {
      this.entries.push(entry);
    });
  }

  /**
   * Given certain Pokemons, stores the information related to them as an entry
   * @param pokemons Pokemons whose entries want to be added
   */
  public storePokemon(...pokemons: Pokemon[]): void {
    pokemons.forEach((pokemon) => {
      this.entries.push([pokemon.getName(), pokemon.getType(), pokemon.getWeight(), pokemon.getHeight(),
        pokemon.getAttack(), pokemon.getDefense(), pokemon.getSpeed(), pokemon.getHitPoints()]);
    });
  }

  /**
   * Given certain names of Pokemons, if the Pokemon has an entry,
   * said entry is deleted from the Pokedex
   * @param pokemons Names of the Pokemons whose entries want to be deleted
   */
  public deletePokemon(...pokemons: string[]): void {
    pokemons.forEach((pokemon) => {
      this.entries.forEach((entry, index) => {
        if (entry[0] == pokemon) {
          this.entries.splice(index, 1);
        }
      });
    });
  }
}