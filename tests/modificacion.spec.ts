import 'mocha';
import {expect} from 'chai';
import {Rational} from '../src/modificacion';

describe('Rational class function tests', () => {
    let rational = new Rational(2, 4);
    let rational2 = new Rational(15, 35);
    let rational3 = new Rational(4, 5);
  
    it('It creates a new instance of an object with class Rational', () => {
      expect(rational).to.be.instanceOf(Rational);
    });
    
    it('There is an atribute for the numerator', () => {
        expect("numerador" in rational).to.be.true;
    });

    it('There is an atribute for the denominator', () => {
        expect("denominador" in rational).to.be.true;
    });

    it('There is a method to simplify the rational number', () => {
        expect(rational.simplification()).to.be.equal('1/2');
        expect(rational2.simplification()).to.be.equal('3/7');
    });

    it('There is a method that reverses the rational number', () => {
        expect(rational.reverse()).to.be.equal('2/1');
    });

    it('There is a method that adds two rational numbers toguether', () => {
        expect(rational3.sum(rational2)).to.be.eql(new Rational(43, 35));
    });

    it('There is a method that subtracts two rational numbers toguether', () => {
        expect(rational3.sub(rational2)).to.be.eql(new Rational(13, 35));
    });

    it('There is a method that multiplies the rational number with another', () => {
        expect(rational3.multiply(rational2)).to.be.eql(new Rational(12, 35));
    });

    it('There is a method that divides the rational number with another', () => {
        expect(rational3.divide(rational2)).to.be.eql(new Rational(28, 15));
    });

    it('There is a method that turns the rational number into a decimal', () => {
        expect(rational3.toDecimal(2)).to.be.equal('0.80');
    });

    it('There is a method that prints the rational number', () => {
        expect(rational3.print()).to.be.equal('4/5');
    });
  });