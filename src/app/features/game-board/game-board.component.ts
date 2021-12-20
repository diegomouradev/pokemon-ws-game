import { Component} from '@angular/core';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { GenerateNewGameBoardService } from './services/game-board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  errorMessage: string;


  pokeData$ = this.gameDataService.pokeData$
  wordList$ = this.gameDataService.wordList$
  gameBoard$ = forkJoin([this.pokeData$, this.wordList$]).pipe(
    map(
      ([pokeData, wordList]) => this.generateNewGameBoardService.buildGameBoard(pokeData, wordList)
    ),
    catchError( err => this.errorMessage = err)
  )


  constructor(private generateNewGameBoardService: GenerateNewGameBoardService,
    private gameDataService: GameDataService) {}
 
}
