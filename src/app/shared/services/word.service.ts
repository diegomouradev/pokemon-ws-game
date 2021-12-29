import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeScan } from 'rxjs/operators';
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

  constructor() { }

  private pokeWordSubject = new Subject<IPokeTile>();
  pokeWordAction$ = this.pokeWordSubject.asObservable();
  
  private pokeWordCoorSubject = new Subject<IPokeTile>();
  pokeWordCoorAction$ = this.pokeWordCoorSubject.asObservable();

  private wordsFoundSubject = new Subject<IPokeData>();
  wordsFoundAction$ = this.wordsFoundSubject.asObservable();


  emitIPokeTile(iPokeTile): void {
    this.pokeWordSubject.next(iPokeTile.letter);
    this.pokeWordCoorSubject.next(iPokeTile.coordinates);
  }

  getPokeWordActionObservable(): Observable<IPokeTile> {
    return this.pokeWordAction$;
  }

  getPokeWordCoorActionObservable(): Observable<IPokeTile> {
    return this.pokeWordCoorAction$;
  }

  emitWordFound(IPokeData): void {
    this.wordsFoundSubject.next(IPokeData);
  }

  getWordsFondObservable(): Observable<IPokeData> {
    return this.wordsFoundAction$;
  }

  resetPokeWordSubject(pokeList) {
    this.pokeWordSubject.next()
  }

  
}
