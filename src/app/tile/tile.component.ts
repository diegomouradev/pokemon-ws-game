import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITile } from '../grid/grid.model'

@Component({
  selector: 'grid-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input()
  tile: ITile;

  

  constructor() { 
  }

  ngOnInit(): void {
    const letter = this.tile.letter;
  }

}
