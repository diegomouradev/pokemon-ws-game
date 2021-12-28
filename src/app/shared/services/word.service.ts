import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GenerateNewGameBoardService } from 'src/app/features/game-board/services/game-board.service';
import { IPokeData, IWordSoFar } from '../interfaces/IPokeData';
import { IPokeTile, IPokeTileCoor } from '../interfaces/IPokeTile';
import { DrawOnCanvasService } from './canvas.service';
import { GameDataService } from './game-data.service';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  errorMessage;

  constructor(private gameBoardService: GenerateNewGameBoardService) { }
  
  private initialValue: IWordSoFar[] = [{word: '', coordinates:  [{x: 0, y: 0}]  }]
  private wordSubject = new BehaviorSubject<IWordSoFar[]>(this.initialValue);
  
  getWord(): Observable<IWordSoFar[]> {
    return this.wordSubject.asObservable();
  }

  buildWord(word: IWordSoFar[],tile: IPokeTile, pokeList:IPokeData[]): void {
    const wordSoFar = word[0];
    this.wordSubject.next([{word: `${wordSoFar.word}${tile.letter}`, coordinates: [...wordSoFar.coordinates, tile.coordinates], isWordFound: false}]);
   
  }

  resetWord():void {
    this.wordSubject.next(this.initialValue);
  }

  checkWordList(word: IWordSoFar[], pokeList: IPokeData[]): boolean {
    const wordSoFar = word[0];
    for(let [index, pokemon] of pokeList.entries()){
      if(pokemon.word === wordSoFar.word) {
        this.wordSubject.next([{word: `${wordSoFar.word}`, coordinates: [...wordSoFar.coordinates], isWordFound: true}]);
        return true;
      } else {
        this.wordSubject.next([{word: `${wordSoFar.word}`, coordinates: [...wordSoFar.coordinates], isWordFound: false}]);
      }
    }
  }

 


}
