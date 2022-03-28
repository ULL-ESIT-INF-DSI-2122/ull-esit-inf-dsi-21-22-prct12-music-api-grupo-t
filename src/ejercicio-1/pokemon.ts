/**
 * Type to define the types of the different Pokemons.
 */
export type pokeType = "typeFire" | "typeWater" | "typeElectric" | "typePlant" | "typeNormal";

/**
 * Abstract class that describes a set of base stats with attack,
 * defense, speed and HP stats. It implements getters and setters
 * to modify its attributes.
 */
export abstract class BaseStats {
  constructor(protected attack: number, protected defense: number,
    protected speed: number, protected hitPoints: number) {
  }

  public getAttack(): number {
    return this.attack;
  }

  public getDefense(): number {
    return this.defense;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getHitPoints(): number {
    return this.hitPoints;
  }

  public setAttack(value: number) {
    this.attack = value;
  }

  public setDefense(value: number) {
    this.defense = value;
  }

  public setSpeed(value: number) {
    this.speed = value;
  }

  public setHitPoints(value: number) {
    this.hitPoints = value;
  }
}

/**
 * Class Pokemon that stores the information related to the Pokemon
 * and extends BaseStats for the Pokemons.
 */
export class Pokemon extends BaseStats {
  private name: string;
  private alias?: string;
  private type: pokeType;
  private weight: number = 0;
  private height: number = 0;

  constructor(name: string, type: pokeType, weight: number, height: number,
      attack: number, defense: number, speed: number, hitPoints: number, alias?: string) {
    super(attack, defense, speed, hitPoints);
    this.name = name;
    this.type = type;
    this.weight = weight;
    this.height = height;
    this.alias = alias;
  }

  public getName(): string {
    return this.name;
  }

  public getAlias(): string {
    if (this.alias) {
      return this.alias;
    }
    return "Este pokemon no tiene un mote";
  }

  public setAlias(name: string) {
    this.alias = name;
  }

  public getType(): pokeType {
    return this.type;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getHeight(): number {
    return this.height;
  }
}