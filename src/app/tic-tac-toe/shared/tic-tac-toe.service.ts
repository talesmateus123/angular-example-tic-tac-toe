import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private readonly SIZE_BOARD:number = 3;
  private readonly X:number = 1;
  private readonly O:number = 2;
  private readonly EMPTY:number = 0;

  private gameBoard: any;
  private movementsCounter: any;
  private victory: any;

  private _player: number;
  private _displayStartScreen: boolean;
  private _displayGameBoardScreen: boolean;
  private _displayFinalScreen: boolean;

  constructor() { }

  /**
   * Starts the game, its attributes. And set the home screen display,
   * @returns void
   */
  initializeVariables(){
    this.movementsCounter=0;
    this.victory=false;
    this._player=this.X;
    this._displayStartScreen=true;
    this._displayGameBoardScreen=false;
    this._displayFinalScreen=false;
    this.startGameBoard();
  }

  /**
   * Start configuring the game board with empty for all positions in the array.
   * @returns void
   */
  startGameBoard(){
    this.gameBoard = [this.SIZE_BOARD];
    for (let i = 0; i < this.SIZE_BOARD; i++){
      this.gameBoard[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  /**
   * Returns if the home screen needs to be displayed.
   * @returns boolean
   */
  get displayStartScreen(): boolean{
    return this._displayStartScreen;
  }

  /**
   * Returns if the game board screen needs to be displayed.
   * @returns boolean
   */
  get displayGameBoardScreen(): boolean{
    return this._displayGameBoardScreen;
  }

  /**
   * Returns if the final screen needs to be displayed.
   * @returns boolean
   */
  get displayFinalScreen(): boolean{
    return this._displayFinalScreen;
  }

  /**
   * Returns the player's number to play.
   * @returns number
   */
  get player():number{
    return this._player;
  }

  /**
   * Display the game board .
   * @returns void
   */
  startGame(): void{
    this._displayStartScreen = false;
    this._displayGameBoardScreen = true;
  }

  /**
   * Perform a movement in according to the game board array.
   * @param positionX 
   * @param positionY 
   * @returns void
   */
  play(positionX: number, positionY: number): void{
    // If has a invalid movement
    if(this.gameBoard[positionX][positionY] !== this.EMPTY || this.victory){
      return; 
    }
    this.gameBoard[positionX][positionY] = this._player;
    this.movementsCounter++;
    this.victory = this.gameOver(positionX, positionY, this.gameBoard, this._player);
    this._player = (this._player === this.X) ? this.O :  this.X;

    if(!this.victory && this.movementsCounter < 9){
      this.cpuPlay();
    }

    // There was victory
    if(this.victory !== false){
      this._displayFinalScreen=true;
    }

    // There was a tie
    if(!this.victory && this.movementsCounter === 9){
      this._player = 0;
      this._displayFinalScreen = true;
    }
  }

  /**
   * 
   * @param line 
   * @param column 
   * @param gameBoard 
   * @param player 
   * @returns array
   */
  gameOver(line: number, column: number, gameBoard: any, player: number): any{
    let end: any = false;

    // Validate the line
    if(gameBoard[line][0] === player &&
       gameBoard[line][1] === player &&
       gameBoard[line][2] === player){
      end = [[line, 0], [line, 3], [line, 2]];
    }

    // Validate the column
    if(gameBoard[column][0] === player &&
       gameBoard[column][1] === player &&
       gameBoard[column][2] === player){
      end = [[0, column], [1, column], [2, column]];
    }

    // Validate the diagonal
    if(gameBoard[0][0] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][2] === player){
     end = [[0, 0], [1, 1], [2, 2]];
   }

    // Validate the column
    if(gameBoard[0][2] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][0] === player){
     end = [[0, 2], [1, 1], [2, 0]];
   }

   return end;
  }

  /**
   * Logic to simulate a computer movement in a random way.
   * @returns void
   */
  cpuPlay(): void{
    let movement: number[] = this.getMovement(this.O);
    if(movement.length == 0){
      movement = this.getMovement(this.X);
    }

    if(movement.length <= 0){
      let movements: any = [];
      for(let i=0; i<this.SIZE_BOARD; i++){
        for(let j=0; j<this.SIZE_BOARD; j++){
          if(this.gameBoard[i][j] === this.EMPTY){
            movements.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (movements.length - 1)));
      movement = [movements[k][0], movements[k][1]];
    }

    this.gameBoard[movement[0]][movement[1]] = this._player;
    this.movementsCounter++;
    this.victory = this.gameOver(movement[0], movement[1], this.gameBoard, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  /**
   * Get a valid movement for the player victory.
   * @param number 
   * @returns number
   */
  getMovement(player: number): number[]{
    let gameBoard = this.gameBoard;
    for(let line=0; line < this.SIZE_BOARD; line++){
      for(let column=0; column < this.SIZE_BOARD; column++){
        if(gameBoard[line][column] !== this.EMPTY){
          continue;
        }
        gameBoard[line][column] = player;
        if(this.gameOver(line, column, gameBoard, player)){
          return [line, column];
        }
        gameBoard[line][column]=this.EMPTY;
      }
    }
    return [];
  }

  /**
   * Returns if "X" should be displayed for the informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayX(positionX: number, positionY: number): boolean{
    return this.gameBoard[positionX][positionY] ===this.X;
  }

  /**
   * Returns if "O" should be displayed, in according to informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayO(positionX: number, positionY: number): boolean{
    return this.gameBoard[positionX][positionY] ===this.O;
  }

  /**
   * Returns if the victory screen should be displayed, in according to informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayGameVictoryScreen(positionX: number, positionY:number): boolean{
    let displayGameVictoryScreen: boolean = false;
    if(!this.victory){
      return displayGameVictoryScreen;
    }

    for(let position of this.victory){
      if(position[0] === positionX && position[1] === positionY){
        displayGameVictoryScreen = true;
        break;
      }
    }
    return displayGameVictoryScreen;
  }

  /**
   * InitializeVariables a new game and display the game board.
   * @returns void;
   */
  newGame(): void{
    this.initializeVariables();
    this._displayFinalScreen = false;
    this._displayStartScreen = false;
    this._displayGameBoardScreen = true;

  }

}
