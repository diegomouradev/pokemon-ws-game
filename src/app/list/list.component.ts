import { Component, Input, OnInit } from '@angular/core';
import { WORD_LIST } from '../constants';
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

  constructor() { }

  ngOnInit(): void {
  }

  markWordFound($event) {
    this.wordList = $event;
  }

}
