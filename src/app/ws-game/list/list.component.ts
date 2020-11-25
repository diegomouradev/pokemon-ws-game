import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FillGridService } from '../fill-grid.service';
import { IWordList } from '../ws-game.models';

@Component({
  selector: 'grid-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  @Input()
  displayList: IWordList[];
  removeSVGAttributes: string[]
  

  constructor() { 
    
  }
  @Output()
  generateNewGameBoard = new EventEmitter();


  ngOnInit(): void {
  }

  onButtonClicked() {
    this.generateNewGameBoard.emit(this.displayList);
  }

  markWordFound($event) {
    this.displayList = $event;
  }

}
