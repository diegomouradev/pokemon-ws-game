import { Component, OnInit } from '@angular/core';
import { GRID_SIZE, WORD_LIST } from '../constants';
import { BoardService } from '../board.service';
import { IBoardGenerator, ITile } from './grid.model'


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [BoardService]
})
export class GridComponent implements OnInit {
  gameGrid: ITile[][];
 

  constructor(private BoardService: BoardService) {
  }
  
  ngOnInit(): void {
    this.gameGrid = this.BoardService.generateBoard(GRID_SIZE, WORD_LIST);
  }  
}
