import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import {
  distinctUntilKeyChanged,
  map,
  mergeScan,
  withLatestFrom,
} from 'rxjs/operators';

import { WordService } from 'src/app/shared/services/word.service';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-word-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
})
export class WordListComponent {
  errorMessage;
  seed: string = '';

  constructor(
    private generateNewGamBoardService: GenerateNewGameBoardService,
    private wordService: WordService
  ) {}

  toggleWordList$ = this.wordService.getToggleWordList$();

  pokeList$ = this.generateNewGamBoardService.pokeData$;
  isPokeWordFound$ = this.wordService.getPokeWordActionObservable().pipe(
    distinctUntilKeyChanged('coordinates'),
    mergeScan(
      (acc, pokeTile) =>
        pokeTile.letter === ''
          ? of(pokeTile.letter)
          : of(acc + pokeTile.letter),
      this.seed
    ),
    withLatestFrom(this.pokeList$),
    map(([pokeWordSoFar, pokeList]) =>
      pokeList.map((pokemon) => {
        if (pokemon.word === pokeWordSoFar && pokemon.isFound === false) {
          pokemon.isFound = true;
          this.wordService.resetPokeWordSubject();
          return pokemon;
        } else {
          return pokemon;
        }
      })
    )
  );
}
