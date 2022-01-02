import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Observable, of } from 'rxjs';
import { distinctUntilKeyChanged, map, mergeScan, skip, tap, withLatestFrom } from 'rxjs/operators';
import { DrawOnCanvasService } from 'src/app/shared/services/canvas.service';

import { WordService } from 'src/app/shared/services/word.service';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit{
  errorMessage;
  seed: string = "";

  @Input() toggleWordList;

  constructor(private generateNewGamBoardService: GenerateNewGameBoardService,
    private wordService: WordService) { }

  ngOnInit(): void {
   
  }

  pokeList$ = this.generateNewGamBoardService.pokeData$

  isPokeWordFound$ = this.wordService.getPokeWordActionObservable()
  .pipe(
    distinctUntilKeyChanged('coordinates'),
    mergeScan( (acc, pokeTile) => pokeTile.letter === '' ? of(pokeTile.letter) : of(acc + pokeTile.letter), this.seed),
    withLatestFrom(this.pokeList$),
    map( ([pokeWordSoFar, pokeList]) => 
    pokeList.map( pokemon => {
      if(pokemon.word === pokeWordSoFar && pokemon.isFound === false) {
        pokemon.isFound = true;
        this.wordService.resetPokeWordSubject();
        return pokemon;
      } else {
        return pokemon
      };
      })
    ),
  )

}
