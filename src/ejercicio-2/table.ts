/**
 * Class Table that defines a bidimensional array with attributes for
 * its number of columns and rows. Implements methods to insert tokens
 * and print the current state of the game.
 */
export class Table {
  private numRows: number = 0;
  private numCols: number = 0;
  private stateTable: string[][] = [];

  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.stateTable = new Array(numRows).fill(' ').map(() => new Array(numCols).fill(' '));
  }

  public getRows(): number {
    return this.numRows;
  }

  public getColumns(): number {
    return this.numCols;
  }

  public getState(): string[][] {
    return this.stateTable;
  }

  /**
   * Prints the state of the board with its values in the squares.
   */
  public print(): void {
    for (let i = 0; i < this.numCols + 2; i++) {
      process.stdout.write("_");
    }
    process.stdout.write("\n");
    for (let i = 0; i < this.numRows; i++) {
      process.stdout.write("|");
      for (let j = 0; j < this.numCols; j++) {
        process.stdout.write(`${this.stateTable[i][j]}`);
      }
      process.stdout.write("|\n");
    }
    process.stdout.write("\n");
  }

  /**
   * Inserts in the square defined by row and column the character given.
   * @param row Index in the rows.
   * @param col Index in the columns.
   * @param char Character to insert into the square.
   */
  public insertTable(row: number, col: number, char: string): void {
    if (row < this.numRows && row >= 0 &&
        col < this.numCols && col >= 0) {
      this.stateTable[row][col] = char;
    }
  }

  /**
   * Get the character in the square defined by row and columns.
   * @param row Index of the rows.
   * @param col Index of the columns.
   * @returns The character in the designated square.
   */
  public getChar(row: number, col: number): string | undefined {
    if (row >= this.numRows || col >= this.numCols || row < 0 || col < 0) {
      return undefined;
    }
    return this.stateTable[row][col];
  }
}