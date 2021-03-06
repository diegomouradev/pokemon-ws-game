import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITile } from '../ws-game.models'

@Component({
  selector: 'grid-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  word: string;
  
  @Input()
  tile: ITile;

  @Output()
  onTileSelected = new EventEmitter<ITile>();

  constructor() { 
    
  }
  
  ngOnInit(): void {
  }

  toggleTile() {
		if (this.tile.isSelected && typeof this.tile.letterPosition !== 'number' && this.tile.isWord) {
			this.tile.isSelected = this.tile.isSelected;
		} else {
			this.tile.isSelected = !this.tile.isSelected;
		}
		this.onTileSelected.emit(this.tile);
	}
}
