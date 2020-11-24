import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWordList, ITile} from '../ws-game.models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  word: string[] = [];

  @Input()
  gameBoard: ITile[][];
  wordList: IWordList[];
  tile: ITile;

  @Output()
  onWordFound = new EventEmitter<IWordList[]>();

  constructor() {
  }
  
  ngOnInit(): void {
    
  }  

  checkForWord($event): void {
    if($event.isWord) {
      if($event.letterPosition.length && this.word.length === $event.letterPosition[0]){
        this.word[$event.letterPosition[0]] = $event.letter;
      } else if ($event.letterPosition.length && this.word.length === $event.letterPosition[1]){
        this.word[$event.letterPosition[1]] = $event.letter;
      } else {
        this.word[$event.letterPosition] = $event.letter;
      }
      const wordToCheck: string = this.word.join('');
      
      for(let [i,iWord] of this.wordList.entries()) {
        if( wordToCheck === iWord.word ) {
          iWord.isCompleted = true;

          console.log(`You caught a wild ${iWord.word}`);
          
          this.word = []
        } else if($event.letterPosition === 0){
          $event.highlightStart = true;
        }
      }
    }
    this.onWordFound.emit(this.wordList);
  }
}
