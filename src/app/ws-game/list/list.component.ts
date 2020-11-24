import { Component, Input, OnInit, Output } from '@angular/core';
import { IWordList } from '../ws-game.models';

@Component({
  selector: 'grid-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input()
  pokemonList: IWordList[];
  removeSVGAttributes: string[]
  

  constructor() { 
  }

  ngOnInit(): void {
  }

  

  markWordFound($event) {
    this.pokemonList = $event;
  }

}
