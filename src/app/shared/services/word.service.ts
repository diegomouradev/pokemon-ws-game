import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPokeTile } from '../interfaces/IPokeTile';
@Injectable({
  providedIn: 'root'
})
export class WordService {
  errorMessage;

  constructor() { }

  pokeWordInitialValue = {letter: '' , wordLength: 0, letterIndex: 0}

  private pokeWordSubject = new BehaviorSubject<IPokeTile>(this.pokeWordInitialValue);
  pokeWordAction$ = this.pokeWordSubject.asObservable();
  
  emitIPokeTile(iPokeTile): void {
    this.pokeWordSubject.next(iPokeTile);
  }

  getPokeWordActionObservable(): Observable<IPokeTile> {
    return this.pokeWordAction$;
  }

  resetPokeWordSubject() {
    this.pokeWordSubject.next(this.pokeWordInitialValue);
  }



  
}
