import 'mocha';
import {expect} from 'chai';
import {Pokemon} from '../src/ejercicio-1/pokemon';
import {BaseStats} from '../src/ejercicio-1/pokemon';


describe('Pokemon class function tests', () => {
  let pikachu = new Pokemon("Pikachu", "typeElectric", 20, 5, 55, 40, 90, 35, 'Ash');
  let eevee = new Pokemon("Eevee", "typeElectric", 20, 5, 55, 40, 90, 35);

  it('It creates a new instance of an object with class Pokedex', () => {
    expect(pikachu).to.be.instanceOf(Pokemon);
  });

  it('It extends the abstract class of BaseStats', () => {
    expect(Pokemon.prototype).to.be.instanceOf(BaseStats);
  });

  it('There is an attribute for its name and alias', () => {
    expect([pikachu.getName(), pikachu.getAlias()]).to.be.eql(['Pikachu', 'Ash']);
    expect([eevee.getName(), eevee.getAlias()]).to.be.eql(['Eevee', 'Este pokemon no tiene un mote']);
  });

  it('There is an attribute for its weight and height', () => {
    expect([pikachu.getWeight(), pikachu.getHeight()]).to.be.eql([20, 5]);
  });

  it('There is an attribute for its type', () => {
    expect(pikachu.getType()).to.be.equal('typeElectric');
  });

  it('There is an attribute for each of its base stats', () => {
    expect([pikachu.getAttack(), pikachu.getDefense(), pikachu.getSpeed(),
      pikachu.getHitPoints()]).to.be.eql([55, 40, 90, 35]);
  });
});