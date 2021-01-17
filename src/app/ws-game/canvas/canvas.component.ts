import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ITile } from '../ws-game.models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;


  @Input()
  gameBoard: ITile[][];

  constructor() { }

  ngOnInit(): void {
  }

  circleWord ($event) {
    console.log($event);
  }

}
