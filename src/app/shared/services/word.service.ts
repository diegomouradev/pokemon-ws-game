import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPokeTile } from '../interfaces/IPokeTile';
@Injectable({
  providedIn: 'root'
})
export class WordService {
  errorMessage;

  constructor() { }
  wordFound$: Observable<IPokeTile>
  pokeWordInitialValue = {letter: '' , wordLength: 0, letterIndex: 0}

  private pokeWordSubject = new BehaviorSubject<IPokeTile>(this.pokeWordInitialValue);
  pokeWordAction$ = this.pokeWordSubject.asObservable();
  
  emitIPokeTile(iPokeTile: IPokeTile): void {
    this.pokeWordSubject.next(iPokeTile);
  }

  getPokeWordActionObservable(): Observable<IPokeTile> {
    return this.pokeWordAction$;
  }

  resetPokeWordSubject() {
    this.pokeWordSubject.next(this.pokeWordInitialValue);
  }

  emitWordFound(wordFound):void {
    this.wordFound$ = new Observable(wordFound);
  }

  getWordFoundObservable(): Observable<IPokeTile> {
    return this.wordFound$;
  }
  
}
