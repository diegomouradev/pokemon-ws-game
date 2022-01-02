import {  Component,Input} from '@angular/core';
import { IPokeTile} from 'src/app/shared/interfaces/IPokeTile';
import { WordService } from 'src/app/shared/services/word.service';
@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent  {
  @Input() tile: IPokeTile;

  constructor(private wordService: WordService) {}

  onTileClick():void {
    this.wordService.emitIPokeTile(this.tile);
  }
}