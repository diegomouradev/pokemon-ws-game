import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import {
  catchError,
  defaultIfEmpty,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import {
  debug,
  RxJsLoggingLevel,
} from 'src/app/shared/operators/debug.operator';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { GenerateNewGameBoardService } from './services/game-board.service';

@Component({
  selector: 'app-game-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  errorMessage: string;

  constructor(
    private generateNewGameBoardService: GenerateNewGameBoardService,
    private gameDataService: GameDataService
  ) {}

  pokeData$ = this.gameDataService.pokeData$;
  gameBoard$ = this.pokeData$.pipe(
    map((pokeData) => {
      return this.generateNewGameBoardService.buildGameBoard(pokeData);
    }),
    catchError((err) => (this.errorMessage = err))
  );
}
