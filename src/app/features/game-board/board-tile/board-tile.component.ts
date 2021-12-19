import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {  fromEvent, Subject } from 'rxjs';
import { Itile } from 'src/app/shared/interfaces/itile';
import { DrawOnCanvasService } from 'src/app/shared/services/canvas.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent implements OnInit {
  @Input() tile: Itile;
  
  constructor(private canvasService: DrawOnCanvasService) {}
  isSelected: boolean = false;


  ngOnInit(): void {}

  private tileSelectedSubject = new Subject<Itile>();
  tileSelectedAction$ = this.tileSelectedSubject.asObservable();

  onTileClick(): void {
    this.tileSelectedSubject.next(this.tile);

  }
}
