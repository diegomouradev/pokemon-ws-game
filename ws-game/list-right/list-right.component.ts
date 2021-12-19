import { Component, Input, OnInit } from '@angular/core';
import { IWordList } from '../ws-game.models';

@Component({
  selector: 'list-right',
  templateUrl: './list-right.component.html',
  styleUrls: ['./list-right.component.scss']
})
export class ListRightComponent implements OnInit {
  
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
