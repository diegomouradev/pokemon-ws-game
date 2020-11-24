import { Injectable } from '@angular/core';
import { FillGridService } from './ws-game/fill-grid.service';
import { IBoardGenerator, IList, ITile } from './ws-game/grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements IBoardGenerator{

  constructor(private readonly DiegoGridService: FillGridService) { 
  }
//   generateBoard(gridSize: number, wordList: IList[]): ITile[][] {
//     return this.DiegoGridService.generateBoard(gridSize, wordList);
//   }
}
