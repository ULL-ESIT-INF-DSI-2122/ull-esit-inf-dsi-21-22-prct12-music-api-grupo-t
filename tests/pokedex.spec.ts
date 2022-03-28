import 'mocha';
import {expect} from 'chai';
import {Pokedex} from '../src/ejercicio-1/pokedex';
import {Pokemon} from '../src/ejercicio-1/pokemon';


describe('Pokedex class function tests', () => {
  let pokedex = new Pokedex(["Eevee", "typeNormal", 20, 5, 55, 50, 55, 55]);

  it('It creates a new instance of an object with class Pokedex', () => {
    expect(pokedex).to.be.instanceOf(Pokedex);
  });

  it('There is an array of entries for the information of Pokemons', () => {
    expect("entries" in pokedex).to.be.true;
    expect(pokedex.entries).to.be.eql([["Eevee", "typeNormal", 20, 5, 55, 50, 55, 55]]);
  });

  it('Stores the data of the given Pokemons', () => {
    let pikachu = new Pokemon("Pikachu", "typeElectric", 20, 5, 55, 40, 90, 35);
    let charmander = new Pokemon("Charmander", "typeFire", 20, 5, 55, 40, 90, 35);
    let bulbasur = new Pokemon("Bulbasur", "typePlant", 20, 5, 55, 50, 55, 55);
    pokedex.storePokemon(pikachu, charmander, bulbasur);

    expect(pokedex.entries).to.be.eql([
      ["Eevee", "typeNormal", 20, 5, 55, 50, 55, 55],
      ["Pikachu", "typeElectric", 20, 5, 55, 40, 90, 35],
      ["Charmander", "typeFire", 20, 5, 55, 40, 90, 35],
      ["Bulbasur", "typePlant", 20, 5, 55, 50, 55, 55]]);
  });

  it('Deletes the entries of the Pokemon given its names', () => {
    pokedex.deletePokemon("Pikachu", "Eevee");
    expect(pokedex.entries).to.be.eql([
      ["Charmander", "typeFire", 20, 5, 55, 40, 90, 35],
      ["Bulbasur", "typePlant", 20, 5, 55, 50, 55, 55]]);
  });
});