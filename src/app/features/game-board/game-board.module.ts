import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameBoardRoutingModule } from './game-board-routing.module';
import { GameBoardComponent } from './game-board.component';
import { BoardTileComponent } from './board-tile/board-tile.component';
import { BoardCanvasComponent } from './board-canvas/board-canvas.component';
import { GenerateNewGameBoardService } from './services/game-board.service';


@NgModule({
  declarations: [GameBoardComponent, BoardTileComponent, BoardCanvasComponent],
  imports: [CommonModule, GameBoardRoutingModule],
  exports: [],
  providers: [GenerateNewGameBoardService],
})
export class GameBoardModule {}
