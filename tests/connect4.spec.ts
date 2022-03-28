import 'mocha';
import {expect} from 'chai';
import {Table} from '../src/ejercicio-2/table';
import {Connect4} from '../src/ejercicio-2/connect4';


describe('Connect4 class function tests', () => {
  let connect4 = new Connect4();

  it('It creates a new instance of an object with class Table', () => {
    expect(connect4).to.be.instanceOf(Connect4);
  });

  it('It has an attribute for the table of the game', () => {
    expect(connect4.getTable()).to.be.eql(new Table(6, 7));
  });

  it('It has an attribute for the tokens of each player', () => {
    expect(connect4.getTokensFirstPlayer()).to.be.equal(21);
    expect(connect4.getTokensSecPlayer()).to.be.equal(21);
  });

  it('It has a method for calculating the total tokens remaining', () => {
    expect(connect4.getTotalTokens()).to.be.equal(42);
  });

  it('It has a methods for substracting one token of a player', () => {
    connect4.subTokensFirstPlayer();
    connect4.subTokensSecPlayer();
    expect(connect4.getTokensFirstPlayer()).to.be.equal(20);
    expect(connect4.getTokensSecPlayer()).to.be.equal(20);
    expect(connect4.getTotalTokens()).to.be.equal(40);
  });

  it('It has a method for inserting a token in the table', () => {
    connect4.insertToken(1, 'X');
    connect4.insertToken(-1, 'X');
    expect(connect4.getTable().getState()).to.be.eql([
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' ', ' ', ' ', ' ']]);
  });

  it('It has a method for checking the row with the last element in a column', () => {
    expect(connect4.rowCharTop(1)).to.be.equal(5);
  });

  it('It has a method for checking if there is a win given a column with the last element introduced', () => {
    expect(connect4.checkWinCondition(1)).to.be.false;
    connect4.insertToken(1, 'X');
    connect4.insertToken(1, 'X');
    connect4.insertToken(1, 'X');
    connect4.insertToken(-1, 'X');
    expect(connect4.checkWinCondition(1)).to.be.true;
    expect(connect4.getTable().getState()).to.be.eql([
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' ', ' ', ' ', ' ']]);
  });

  it('It has a method that starts the game given two players`s names', () => {
    expect("start" in connect4).to.be.true;
  });
});