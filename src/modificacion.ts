/**
 * Class that represents rational numbers with a numerator and denominator
 */
export class Rational {
    public numerador: number = 0;
    public denominador: number = 1;

    /**
     * Constructor of class Rational
     * @param numerador Numerator of the rational number
     * @param denominador Denominator of the rational number
     */
    constructor(numerador: number, denominador: number) {
        if (denominador == 0) {
            this.denominador = 1;
        } else {
            this.denominador = denominador;
        }
        this.numerador = numerador;
    }

    /**
     * Simplifies the rational number, ej: [2/4] -> [1/2]
     */
    public simplification(): string {
        let dNumber = this.mcd(this.numerador, this.denominador);
        this.numerador /= dNumber;
        this.denominador /= dNumber;
        return `${this.numerador}/${this.denominador}`;
    }

    /**
     * Exchanges the values of the numerator and the denominator
     */
    public reverse(): string {
        let aux = this.numerador;
        this.numerador = this.denominador;
        this.denominador = aux;
        return `${this.numerador}/${this.denominador}`;
    }

    /**
     * Calculates the maximum comun divisor between two numbers
     * @param a 
     * @param b 
     */
    private mcd(a: number, b: number): number {
        if (a == b) {
            return a;
        } else {
            if (a > b) {
                return this.mcd(a - b, b);
            } else {
                return this.mcd(a, b - a);
            }
        }
    }

    /**
     * Sums two rational numbers and returns a new Rational object
     * @param secRational The rational to be added with
     */
    public sum(secRational: Rational): Rational {
        let resultDen = this.denominador * secRational.denominador;
        let firstNumerator = this.numerador * secRational.denominador;
        let secondNumerator = secRational.numerador * this.denominador;
        return new Rational(firstNumerator + secondNumerator, resultDen);
    }

    /**
     * Substracts two rational numbers and returns a new Rational object
     * @param secRational The rational to be substracted with
     */
    public sub(secRational: Rational): Rational {
        let resultDen = this.denominador * secRational.denominador;
        let firstNumerator = this.numerador * secRational.denominador;
        let secondNumerator = secRational.numerador * this.denominador;
        return new Rational(firstNumerator - secondNumerator, resultDen);
    }

    /**
     * Multiplies two rational numbers and returns a new rational
     * @param anRational The rational to be multiplied with
     */
    public multiply(anRational: Rational): Rational {
        let numerador = this.numerador * anRational.numerador;
        let denominador = this.denominador * anRational.denominador;
        return new Rational(numerador, denominador);
    }

    /**
     * Divides two rational numbers and returns a new rational
     * @param anRational The rational to be divided with
     */
    public divide(anRational: Rational): Rational {
        let numerador = this.numerador * anRational.denominador;
        let denominador = this.denominador * anRational.numerador;
        return new Rational(numerador, denominador);
    }

    /**
     * Returns a decimal equivalent of the rational number
     * @param decimals Number of digits after the decimal point
     */
    public toDecimal(decimals: number): string {
        let decimal = this.numerador / this.denominador;
        return decimal.toFixed(decimals);
    }

    /**
     * Prints the rational number
     */
    public print(): string {
        console.log(`${this.numerador}/${this.denominador}`);
        return `${this.numerador}/${this.denominador}`;
    }  
}