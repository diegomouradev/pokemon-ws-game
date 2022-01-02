import { Component, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, defaultIfEmpty, map, startWith, tap } from 'rxjs/operators';
import { debug, RxJsLoggingLevel } from 'src/app/shared/operators/debug.operator';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { GenerateNewGameBoardService } from './services/game-board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent  {
  errorMessage: string;

  form = new FormGroup({
      "toggleWordList": new FormControl(false)
  })

  @Output() form$ = this.form.valueChanges.pipe(
    defaultIfEmpty({toggleWordList: false}),
    map(changes => changes.toggleWordList),
    tap(result => console.log(result))
  )

    
  constructor(private generateNewGameBoardService: GenerateNewGameBoardService,
    private gameDataService: GameDataService) {
    }

  // ngOnInit(): void {
  //   this.form$ = of(this.form$);
  // }

  pokeData$ = this.gameDataService.pokeData$
  gameBoard$ = this.pokeData$.pipe(
    map(
      (pokeData) => {
        return this.generateNewGameBoardService.buildGameBoard(pokeData);
      }
    ),
    debug(RxJsLoggingLevel.INFO, "pokeData"),
    catchError( err => this.errorMessage = err)
  )  
  
}
