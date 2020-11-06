import { Component, OnInit } from '@angular/core';
import { FillGridService } from '../fill-grid.service';

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
    this.FillGridService.generateWordsSample();
    this.FillGridService.generateInsertionMap();
    this.insertWords();
  }

  ngOnInit(): void {
  }
  

  insertWords(): GridComponent {
    this.gameGrid = this.FillGridService.insertWords();
    return this;
  }

  
}
