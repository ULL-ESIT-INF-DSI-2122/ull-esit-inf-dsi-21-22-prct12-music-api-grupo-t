import 'mocha';
import {expect} from 'chai';
import {Pokemon} from '../src/ejercicio-1/pokemon';
import {Combat} from '../src/ejercicio-1/combat';


describe('Combat class function tests', () => {
  let pikachu = new Pokemon("Chikorita", "typePlant", 20, 5, 55, 40, 90, 220, 'Ash');
  let charmander = new Pokemon("Charmander", "typeFire", 20, 5, 55, 40, 90, 300);
  let combat = new Combat(pikachu, charmander);

  it('It creates a new instance of an object with class Combat', () => {
    expect(combat).to.be.instanceOf(Combat);
  });

  it('It has two attributes for its combatants', () => {
    expect([combat.firstPokemon, combat.secondPokemon]).to.be.eql([pikachu, charmander]);
  });

  it('There is a method for calculating the damage dealt', () => {
    expect("dmgResult" in combat).to.be.true;
  });

  it('There is a method to start the combat', () => {
    expect("start" in combat).to.be.true;
  });

  it('The combat begins correctly and returns the winner', () => {
    expect(combat.start()).to.be.equal("Charmander");
  });
});