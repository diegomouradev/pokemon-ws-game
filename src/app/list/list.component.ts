import { Component, Input, OnInit, Output } from '@angular/core';
import { POKEMON, WORD_LIST } from '../constants';
import { IList } from '../grid/grid.model';


@Component({
  selector: 'grid-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  wordList: IList[] = WORD_LIST;
  

  @Input()
  iWord: IList;
  removeSVGAttributes: string[]
  pokemons: object = POKEMON;

  constructor() { }

  ngOnInit(): void {
  }

  markWordFound($event) {
    this.wordList = $event;
  }

}
