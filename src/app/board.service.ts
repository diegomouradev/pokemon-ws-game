import { Injectable } from '@angular/core';
import { FillGridService } from './fill-grid.service';
import { IBoardGenerator, ITile } from './grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements IBoardGenerator{

  constructor(private readonly DiegoGridService: FillGridService) { 
  }
  generateBoard(gridSize: number, wordList: string[]): ITile[][] {
    return this.DiegoGridService.generateBoard(gridSize, wordList);
  }
}
