import { Component, OnInit } from '@angular/core';
import { FillGridService } from '../fill-grid.service';
import { IBoardGenerator } from './grid.model'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [FillGridService]
})
export class GridComponent implements OnInit {
  gameGrid;

  constructor(private FillGridService: FillGridService) {
    this.FillGridService.generateGrid();
    this.FillGridService.placeWord();
  }

  ngOnInit(): void {
    this.insertWords();
  }

  insertWords(): GridComponent {
    this.gameGrid = this.FillGridService.grid;
    return this;
  }

  
}
