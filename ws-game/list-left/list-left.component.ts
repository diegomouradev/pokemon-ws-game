import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IWordList } from '../ws-game.models';

@Component({
  selector: 'list-left',
  templateUrl: './list-left.component.html',
  styleUrls: ['./list-left.component.scss']
})
export class ListComponent implements OnInit {


  @Input()
  displayList: IWordList[];
  removeSVGAttributes: string[]
  

  constructor() { 
    
  }



  ngOnInit(): void {
    
  }


  markWordFound($event) {
    this.displayList = $event;
  }

}
