import { Component, OnInit } from '@angular/core';
import { FillGridService } from '../fill-grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [FillGridService]
})
export class GridComponent implements OnInit {
  grid;
  gameGrid;
  
  constructor(private FillGridService: FillGridService) {
    this.generateGrid();
    this.gameGrid = this.FillGridService.insertWords(this.grid);
  }

  ngOnInit(): void {
    
  }
  
  generateGrid(): GridComponent {
    this.grid = this.FillGridService.generateGrid();
    
    return this;
  }
}
