import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './shared';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.ticTacToeService.initializeVariables();
  }

  /**
   * Returns if the start screen mus to be displayed.
   * @returns boolean
   */
  get displayStartScreen(): boolean{
    return this.ticTacToeService.displayStartScreen
  }

  /**
   * Returns if the game board screen should be displayed.
   * @returns boolean
   */
  get displayGameBoardScreen(): boolean{
    return this.ticTacToeService.displayGameBoardScreen
  }

  /**
   * Returns if the final screen should be displayed.
   * @returns boolean
   */
  get displayFinalScreen(): boolean{
    return this.ticTacToeService.displayFinalScreen
  }

  /**
   * Initialize all game data.
   * @returns void
   */
  startGame(): void{
    this.ticTacToeService.startGame();
  }

  /**
   * Perform a new player movement on click on game board.
   * @param positionX 
   * @param positionY 
   * @returns void
   */
  play(positionX: number, positionY: number): void{
    console.log(positionX, positionY);
    this.ticTacToeService.play(positionX, positionY);
  }

  /**
   * Returns if "X" should be displayed for the informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayX(positionX: number, positionY: number): boolean{
    return this.ticTacToeService.displayX(positionX, positionY);
  }

  /**
   * Returns if "O" should be displayed for the informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayO(positionX: number, positionY: number): boolean{
    return this.ticTacToeService.displayO(positionX, positionY);
  }

  /**
   * Returns if the victory screen should be displayed, in according to informed array position.
   * @param positionX 
   * @param positionY 
   * @returns boolean
   */
  displayVictoryScreen(positionX: number, positionY: number): boolean{
    return this.ticTacToeService.displayGameVictoryScreen(positionX, positionY);
  }


  /**
   * Returns a player number to play.
   * @return number
   */
  get player(): number {
  	return this.ticTacToeService.player;
  }

  /**
   * Starts a new game.   * 
   * @return void
   */
  newGame(): void {
  	this.ticTacToeService.newGame();
  }

}
