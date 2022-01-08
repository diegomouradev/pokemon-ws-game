import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { GameBoardRoutingModule } from './game-board-routing.module';
import { GameBoardComponent } from './game-board.component';
import { BoardTileComponent } from './board-tile/board-tile.component';
import { BoardCanvasComponent } from './board-canvas/board-canvas.component';
import { GenerateNewGameBoardService } from './services/game-board.service';
import { WordListComponent } from './word-list/word-list.component';
import { WordListToggleComponent } from './word-list-toggle/word-list-toggle.component';

@NgModule({
  declarations: [
    GameBoardComponent,
    BoardTileComponent,
    BoardCanvasComponent,
    WordListComponent,
    WordListToggleComponent,
  ],
  imports: [SharedModule, GameBoardRoutingModule],
  exports: [],
  providers: [GenerateNewGameBoardService],
})
export class GameBoardModule {}
