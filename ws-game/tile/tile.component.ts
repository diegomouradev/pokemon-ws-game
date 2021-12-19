import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITile } from '../ws-game.models';

@Component({
  selector: 'grid-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  word: string;

  @Input()
  tile: ITile;

  @Output()
  onTileSelected = new EventEmitter<ITile>();

  constructor() {}

  ngOnInit(): void {}

  toggleTile() {
    this.onTileSelected.emit(this.tile);
  }
}
