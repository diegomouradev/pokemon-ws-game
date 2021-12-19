import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';

@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.scss']
})
export class BoardCanvasComponent implements AfterViewInit {
  canvas: HTMLCanvasElement;
  constructor(private drawOnCanvasService: DrawOnCanvasService) { }

  ngOnInit(): void {
  }

  @Input() gameBoardEl: HTMLDivElement;
 
  @ViewChild('canvas') canvasRef: ElementRef;
  canvasHeight: number;
  canvasWidth: number;
  ctx: CanvasRenderingContext2D;
  drawingDirection: string;
  xInitial: number;
  yInitial: number;
  xFinal: number;
  yFinal: number;


  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasHeight = this.gameBoardEl.getBoundingClientRect().height ;
    this.canvasWidth = this.gameBoardEl.getBoundingClientRect().width;
    this.updateCanvaSize();
    this.ctx = this.canvas.getContext('2d');
  
  }

  updateCanvaSize(): void {
    this.canvas.setAttribute('width', `${this.canvasWidth}`)
    this.canvas.setAttribute('height', `${this.canvasHeight}`)
  }

  onWordFound() {
    this.drawOnCanvasService.draw(this.ctx);
  }

  
}
