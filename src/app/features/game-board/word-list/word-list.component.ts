import { Component } from '@angular/core';
import {  of } from 'rxjs';
import { map, mergeScan, tap, withLatestFrom } from 'rxjs/operators';

import { WordService } from 'src/app/shared/services/word.service';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent  {
  errorMessage;
  seed: string = "";

  constructor(private generateNewGamBoardService: GenerateNewGameBoardService,
    private wordService: WordService) { }

  pokeList$ = this.generateNewGamBoardService.pokeData$

  isPokeWordFound$ = this.wordService.getPokeWordActionObservable()
  .pipe(
    mergeScan( (acc, pokeTile) => pokeTile.letter === '' ? of(pokeTile.letter) : of(acc + pokeTile.letter), this.seed),
    withLatestFrom(this.pokeList$),
    tap(result => console.log(result)),
    map( ([pokeWordSoFar, pokeList]) => pokeList.map( pokemon => {
              if(pokemon.word === pokeWordSoFar && pokemon.isFound === false) {
                pokemon.isFound = true;
                this.wordService.emitWordFound(pokemon);
                this.wordService.resetPokeWordSubject();
                return pokemon;
              } else {
                return pokemon
              };
            })
        ),
  )
}
