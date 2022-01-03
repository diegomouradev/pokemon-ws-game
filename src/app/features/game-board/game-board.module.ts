import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameBoardRoutingModule } from './game-board-routing.module';
import { GameBoardComponent } from './game-board.component';
import { BoardTileComponent } from './board-tile/board-tile.component';
import { BoardCanvasComponent } from './board-canvas/board-canvas.component';
import { GenerateNewGameBoardService } from './services/game-board.service';
import { WordListComponent } from './word-list/word-list.component';

@NgModule({
  declarations: [GameBoardComponent, BoardTileComponent, BoardCanvasComponent, WordListComponent ],
  imports: [CommonModule, GameBoardRoutingModule, ReactiveFormsModule],
  exports: [],
  providers: [GenerateNewGameBoardService]
})
export class GameBoardModule {}
