import 'mocha';
import {expect} from 'chai';
import {Table} from '../src/ejercicio-2/table';


describe('Table class function tests', () => {
  let table = new Table(4, 5);
  let emptyTable = new Table(0, 0);

  it('It creates a new instance of an object with class Table', () => {
    expect(table).to.be.instanceOf(Table);
  });

  it('It has two attributes for its rows and columns', () => {
    expect([table.getRows(), table.getColumns()]).to.be.eql([4, 5]);
    expect([emptyTable.getRows(), emptyTable.getColumns()]).to.be.eql([0, 0]);
  });

  it('It has an attribute for the state of the table', () => {
    expect(table.getState()).to.be.eql([
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ']]);
    expect(emptyTable.getState()).to.be.eql([]);
  });

  it('There is a method for printing the table', () => {
    expect("print" in table).to.be.true;
  });

  it('There is an method for inserting an element in the table', () => {
    table.insertTable(0, 0, 'X');
    emptyTable.insertTable(1, 1, 'X');
    expect("insertTable" in table).to.be.true;
    expect(table.getState()).to.be.eql([
      ['X', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ']]);
    expect(emptyTable.getState()).to.be.eql([]);
  });

  it('There is a method to get the character stored in a square', () => {
    expect(table.getChar(0, 0)).to.be.equal("X");
    expect(emptyTable.getChar(0, 0)).to.be.equal(undefined);
  });
});