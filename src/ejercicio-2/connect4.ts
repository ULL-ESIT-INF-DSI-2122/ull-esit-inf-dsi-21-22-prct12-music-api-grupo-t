import {Table} from '../ejercicio-2/table';

/**
 * Class Connect4 to initiate the attributes of a game of Connect4,
 * with methods to start the game and set the rules.
 */
export class Connect4 {
  private table: Table;
  private tokens: [number, number];

  constructor() {
    this.table = new Table(6, 7);
    this.tokens = [21, 21];
  }

  public getTable(): Table {
    return this.table;
  }

  /**
   * Gets the remaining tokens of the first player.
   * @returns The remaining tokens.
   */
  public getTokensFirstPlayer(): number {
    return this.tokens[0];
  }

  /**
   * Gets the remaining tokens of the second player.
   * @returns The remaining tokens.
   */
  public getTokensSecPlayer(): number {
    return this.tokens[1];
  }

  /**
   * Gets the total tokens of both players.
   * @returns The total tokens left in-game.
   */
  public getTotalTokens(): number {
    return this.tokens[0] + this.tokens[1];
  }

  /**
   * Substracts a token from the first player.
   */
  public subTokensFirstPlayer(): void {
    this.tokens[0]--;
  }

  /**
   * Substracts a token from the second player.
   */
  public subTokensSecPlayer(): void {
    this.tokens[1]--;
  }

  /**
   * Inserts a token into the designated column given as argument.
   * @param numCol Number of the column to insert the token.
   * @param token Character of the token to insert.
   * @returns Returns true if the token was sucessfully inserted.
   */
  public insertToken(numCol: number, token: string): boolean {
    let inserted = false;
    let j = numCol - 1;
    let i = 5;
    while (i >= 0) {
      if (this.table.getChar(i, j) == ' ') {
        this.table.insertTable(i, j, token);
        inserted = true;
        break;
      }
      i--;
    }
    return inserted;
  }

  /**
   * Given a column, returns the number of the row with the last character inserted.
   * @param numCol Number of the column to check the last token inserted.
   * @returns The number of the row.
   */
  public rowCharTop(numCol: number): number {
    let col = numCol - 1;
    let row = 0;
    while (row < 6) {
      if (this.table.getChar(row, col) == ' ') {
        row++;
      } else {
        break;
      }
    }
    return row;
  }

  /**
   * Given a column, checks if the last token inserted connects 4 other
   * tokkens of the same player to win the game.
   * @param numCol Number of the column of the last token inserted.
   * @returns Returns true if there are 4 connected tokens.
   */
  public checkWinCondition(numCol: number): boolean {
    let col = numCol - 1;
    let row = this.rowCharTop(numCol);
    let charWin = this.table.getChar(row, col);

    let consecutives = 1;
    // Checks in the right
    while (this.table.getChar(row, col + consecutives) == charWin) {
      consecutives++;
    }
    // Checks in the left
    while (this.table.getChar(row, col - consecutives) == charWin) {
      consecutives++;
    }
    if (consecutives >= 4) {
      return true;
    }

    consecutives = 1;
    // Checks above
    while (this.table.getChar(row - consecutives, col) == charWin) {
      consecutives++;
    }
    // Checks below
    while (this.table.getChar(row + consecutives, col) == charWin) {
      consecutives++;
    }
    if (consecutives >= 4) {
      return true;
    }

    consecutives = 1;
    // Checks diagonal up-right
    while (this.table.getChar(row - consecutives, col + consecutives) == charWin) {
      consecutives++;
    }
    // Checks diagonal down-left
    while (this.table.getChar(row + consecutives, col - consecutives) == charWin) {
      consecutives++;
    }
    if (consecutives >= 4) {
      return true;
    }

    consecutives = 1;
    // Checks diagonal down-right
    while (this.table.getChar(row + consecutives, col + consecutives) == charWin) {
      consecutives++;
    }
    // Checks diagonal up-left
    while (this.table.getChar(row - consecutives, col - consecutives) == charWin) {
      consecutives++;
    }
    if (consecutives >= 4) {
      return true;
    }
    return false;
  }

  /**
   * Initiates the game with the names of the given players and
   * returns the winner who triggers a connection of 4 tokkens.
   * @param playerOne Name of the first player.
   * @param playerTwo Name of the second player.
   * @returns The winner of the game. If no tokens are left, its declared a draw.
   */
  public start(playerOne: string, playerTwo: string): string {
    this.table.print();
    let scanf = require('scanf');
    let connected = false;
    let winner = "";

    while (connected == false) {
      // Turn of the first player
      process.stdout.write(`${playerOne}, toca poner ficha, elija columna: `);
      let choosenCol = scanf('%d');
      // Inserts the token in the column
      let inserted = false;
      while (inserted == false) {
        inserted = this.insertToken(choosenCol, "X");
        if (inserted == false) {
          process.stdout.write(`Columna llena, por favor, elija otra: `);
          choosenCol = scanf('%d');
        }
      }
      this.subTokensFirstPlayer();
      this.table.print();
      // Checks if there is a connection of 4 tokens
      connected = this.checkWinCondition(choosenCol);
      if (connected) {
        winner = playerOne;
        break;
      }

      // Turn of second player
      process.stdout.write(`${playerTwo}, toca poner ficha, elija columna: `);
      choosenCol = scanf('%d');
      // Inserts the token in the column
      inserted = false;
      while (inserted == false) {
        inserted = this.insertToken(choosenCol, "O");
        if (inserted == false) {
          process.stdout.write(`Columna llena, por favor, elija otra: `);
          choosenCol = scanf('%d');
        }
      }
      this.subTokensSecPlayer();
      this.table.print();
      // Checks if there is a connection of 4 tokens
      connected = this.checkWinCondition(choosenCol);
      if (connected) {
        winner = playerTwo;
        break;
      }
      // If no more tokens are left
      if (this.getTotalTokens() == 0) {
        winner = "Draw";
        break;
      }
    }
    return winner;
  }
}

// To initialize a game:
// let connect4 = new Connect4();
// let winner = connect4.start("FirstPlayer", "SecPlayer");
// console.log(`The winner is: ${winner}`);