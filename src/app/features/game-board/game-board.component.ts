import { AfterViewChecked, AfterViewInit, Component, ElementRef, Output, ViewChild} from '@angular/core';
import { forkJoin, fromEvent, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { EventEmitter } from '@angular/core';
import { GenerateNewGameBoardService } from './services/game-board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent  {
  errorMessage: string;

  @Output() isEven = 'even';
  @Output() isOdd = 'odd';
  
  constructor(private generateNewGameBoardService: GenerateNewGameBoardService,
    private gameDataService: GameDataService) {}

  pokeData$ = this.gameDataService.pokeData$

  gameBoard$ = this.pokeData$.pipe(
    map(
      (pokeData) => {
        return this.generateNewGameBoardService.buildGameBoard(pokeData);
      }
    ),
    catchError( err => this.errorMessage = err)
  )



  
}
