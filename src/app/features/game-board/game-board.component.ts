import { Component} from '@angular/core';
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
  gameBoard$ = this.gameDataService.pokeData$.pipe(
    map(
      pokeData => this.generateNewGameBoardService.generateGameBoard(pokeData)
    ),
    catchError(err => this.errorMessage = err)
  );

  constructor(private generateNewGameBoardService: GenerateNewGameBoardService,
    private gameDataService: GameDataService) {}
 
}
