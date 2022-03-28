import {Pokemon} from '../ejercicio-1/pokemon';

/**
 * Constants to define the bonus effectiveness of Pokemon`s attacks
 */
const veryEffective = 2;
const aNeutral = 1;
const notVeryEffective = 0.5;

const missingNo =
    new Pokemon("MissingNo", "typeNormal", 10, 5, 50, 50, 20, 50);

/**
 * Class Combat that defines a combat between two Pokemons.
 * It implements the methods to start the combat and calculate
 * the results.
 */
export class Combat {
  public firstPokemon: Pokemon = missingNo;
  public secondPokemon: Pokemon = missingNo;

  constructor(firstPokemon: Pokemon, secondPokemon: Pokemon) {
    this.firstPokemon = firstPokemon;
    this.secondPokemon = secondPokemon;
  }

  /**
   * Calculates the damage dealt by the attackPkm to the defendPkm,
   * based in the types of both Pokemons and the attack and defense stats.
   * @param attackPkm Pokemon who is attacking.
   * @param defendPkm Pokemon who receives the attack.
   * @returns The damage dealt by the attackPkm.
   */
  private dmgResult(attackPkm: Pokemon, defendPkm: Pokemon): number {
    let typeAdvantage = 0;
    switch (attackPkm.getType()) {
      case "typeFire":
        if (defendPkm.getType() == "typeFire" || defendPkm.getType() == "typeWater") {
          typeAdvantage = notVeryEffective;
        } else if (defendPkm.getType() == "typePlant") {
          typeAdvantage = veryEffective;
        } else {
          typeAdvantage = aNeutral;
        }
        break;
      case "typeWater":
        if (defendPkm.getType() == "typeWater" || defendPkm.getType() == "typePlant" ||
            defendPkm.getType() == "typeElectric") {
          typeAdvantage = notVeryEffective;
        } else if (defendPkm.getType() == "typeFire") {
          typeAdvantage = veryEffective;
        } else {
          typeAdvantage = aNeutral;
        }
        break;
      case "typeElectric":
        if (defendPkm.getType() == "typeElectric") {
          typeAdvantage = notVeryEffective;
        } else if (defendPkm.getType() == "typeWater") {
          typeAdvantage = veryEffective;
        } else {
          typeAdvantage = aNeutral;
        }
        break;
      case "typePlant":
        if (defendPkm.getType() == "typePlant" || defendPkm.getType() == "typeFire") {
          typeAdvantage = notVeryEffective;
        } else if (defendPkm.getType() == "typeWater") {
          typeAdvantage = veryEffective;
        } else {
          typeAdvantage = aNeutral;
        }
        break;
      case "typeNormal":
        typeAdvantage = aNeutral;
        break;
      default:
        console.log("Error: tipo " + attackPkm.getType() + "no esperado.\n");
        return 0;
    }
    let dmg = (50 * (attackPkm.getAttack() / defendPkm.getDefense()) * typeAdvantage);
    if (typeAdvantage == veryEffective) {
      console.log(`It's super effective!: ${dmg} damage`);
    } else if (typeAdvantage == notVeryEffective) {
      console.log(`It wasn't very effective...: ${dmg} damage`);
    } else {
      console.log(`${dmg} damage`);
    }

    return dmg;
  }

  /**
   * Method that simulates and initiates the battle between the Pokemons.
   * @returns The winner of the combat, given as a string.
   */
  public start(): string {
    let attackPkm = this.firstPokemon;
    let defendPkm = this.secondPokemon;
    let winnerPkm: string;

    // Combat simulation
    console.log(`A wild ${defendPkm.getName()} appeared!`);
    console.log(`${attackPkm.getName()} has ${attackPkm.getHitPoints()} HP`);
    console.log(`${defendPkm.getName()} has ${defendPkm.getHitPoints()} HP`);

    while (true) {
      console.log(`${attackPkm.getName()} attacks!`);
      let dmg = this.dmgResult(attackPkm, defendPkm);
      defendPkm.setHitPoints(defendPkm.getHitPoints() - dmg);
      console.log(`${defendPkm.getName()} has ${defendPkm.getHitPoints()} HP left`);

      if (defendPkm.getHitPoints() <= 0) {
        console.log(`${defendPkm.getName()} can't battle anymore, ${attackPkm.getName()} is the winner!`);
        winnerPkm = attackPkm.getName();
        break;
      } else {
        let aux = defendPkm;
        defendPkm = attackPkm;
        attackPkm = aux;
      }
    }
    return winnerPkm;
  }
}