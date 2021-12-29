import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, mergeScan } from 'rxjs/operators';
import { IPokeTile } from 'src/app/shared/interfaces/IPokeTile';
import { WordService } from 'src/app/shared/services/word.service';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnDestroy  {
  errorMessage;
  seed: string = "";

  constructor(private generateNewGamBoardService: GenerateNewGameBoardService,
    private wordService: WordService) { }
  pokeList$ = this.generateNewGamBoardService.pokeData$
  pokeWordAction$ = this.wordService.getPokeWordActionObservable();
  pokeWordSoFar$ = this.pokeWordAction$.pipe(
    mergeScan( (acc, letter) => of(acc + letter), this.seed)
  )
  
  isWordFound$ = combineLatest([this.pokeList$, this.pokeWordSoFar$]).pipe(
    map( ([pokeList, pokeWordSoFar]) => pokeList.map( pokemon => {
          if(pokemon.word === pokeWordSoFar) {
            pokemon.isFound = true;
            this.wordService.emitWordFound(pokemon)
            return pokemon;
          } else {
            return pokemon
          }
        })
    )
  ).subscribe( result => console.log(result))

  ngOnDestroy():void {
    this.isWordFound$.unsubscribe();
  
  }
}
