import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ITile } from '../interfaces/ITile';
import { DrawOnCanvasService } from './canvas.service';
import { GameDataService } from './game-data.service';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  errorMessage;
  
  
  private initialValue: ITile = {word: '', coordinates: [{ x: 0, y: 0 }] }
  private wordSubject = new BehaviorSubject<ITile>(this.initialValue);
  
  getWord(): Observable<ITile> {
    return this.wordSubject.asObservable();
  }

  buildWord(wordSoFar: string, coordinatesSoFar: object[], tile: ITile): void {
    this.wordSubject.next({word: `${wordSoFar}${tile.letter}`, coordinates: [...coordinatesSoFar, tile.coordinates]});
  }

  resetWord():void {
    this.wordSubject.next(this.initialValue);
  }

  

  checkWordList(wordSoFar: string, wordList: string[]): boolean {
    for(let word of wordList){
      if(word === wordSoFar) {
        this.resetWord();
        return true;
      } else {
        return false;
      }
    }
  }

  constructor(private drawOnCanvasService: DrawOnCanvasService) { }


}
