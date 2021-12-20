import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {  fromEvent, Subject } from 'rxjs';
import { ITile } from 'src/app/shared/interfaces/ITile';
import { DrawOnCanvasService } from 'src/app/shared/services/canvas.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent implements OnInit {
  @Input() tile: ITile;
  
  constructor(private canvasService: DrawOnCanvasService) {}
  isSelected: boolean = false;


  ngOnInit(): void {}

  private tileSelectedSubject = new Subject<ITile>();
  tileSelectedAction$ = this.tileSelectedSubject.asObservable();

  onTileClick(): void {
    this.tileSelectedSubject.next(this.tile);

  }
}
