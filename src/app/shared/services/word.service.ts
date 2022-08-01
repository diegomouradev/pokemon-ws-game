import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IPokeTile } from '../interfaces/IPokeTile';
@Injectable({
  providedIn: 'root',
})
export class WordService {
  errorMessage;

  constructor() {}
  wordFound$: Observable<IPokeTile>;

  /*
    => This BehaviorSubject works as a store of IPokeTiles.
    => IPokeTiles are emitted by the BoardTileComponent 
    upon a mouse click event.

    => Subs1 => wordList component: 
    -mergeScan: Form word by accumulating the letters
    -map: Look for word on PokeList. On wordFound reset 
    the subject by emitting the initialValue into the BehaviorSubject.

    => Subs2 => BoardCanvasComponent.
  */
  pokeWordInitialValue = {
    letter: '',
    coordinates: { x: null, y: null },
    wordLength: null,
    letterIndex: null,
  };
  private pokeWordSubject = new BehaviorSubject<IPokeTile>(
    this.pokeWordInitialValue
  );
  pokeWordAction$ = this.pokeWordSubject.asObservable();
  getPokeWordActionObservable(): Observable<IPokeTile> {
    return this.pokeWordAction$;
  }
  emitIPokeTile(iPokeTile: IPokeTile): void {
    this.pokeWordSubject.next(iPokeTile);
  }
  resetPokeWordSubject() {
    this.pokeWordSubject.next(this.pokeWordInitialValue);
  }

  emitWordFound(wordFound): void {
    this.wordFound$ = new Observable(wordFound);
  }

  getWordFoundObservable(): Observable<IPokeTile> {
    return this.wordFound$;
  }

  toggleWordListInitialValue = { toggleWordList: false };
  private toggleWordListSubject = new BehaviorSubject<any>(
    this.toggleWordListInitialValue
  );
  toggleWordList$ = this.toggleWordListSubject.asObservable();
  getToggleWordList$(): Observable<any> {
    return this.toggleWordList$;
  }

  emitToggleWordListState(toggleWordListState): void {
    this.toggleWordListSubject.next(toggleWordListState);
  }
}
