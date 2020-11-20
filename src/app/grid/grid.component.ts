import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GRID_SIZE, WORD_LIST } from '../constants';
import { BoardService } from '../board.service';
import { IBoardGenerator, IList, ITile } from './grid.model'


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [BoardService]
})
export class GridComponent implements OnInit {
  gameGrid: ITile[][];
  wordList: IList[]= WORD_LIST;
  word: string[] = [];

  @Output()
  onWordFound = new EventEmitter<IList[]>();

  constructor(private BoardService: BoardService) {
  }
  
  ngOnInit(): void {
    this.gameGrid = this.BoardService.generateBoard(GRID_SIZE, WORD_LIST);
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
          iWord.completed = true;

          console.log(`You caught a wild ${iWord.word}`);
          
          this.word = []
        }
      }
    }
    this.onWordFound.emit(this.wordList);
  }
}
