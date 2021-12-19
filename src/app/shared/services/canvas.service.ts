import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawOnCanvasService {

  constructor() { }

  ctx: CanvasRenderingContext2D;

  moveX:number;
  moveY:number;

firstTile$;
  // tileSelectedAction$ = this.boardTileComponent.tileSelectedAction$.subscribe()
  startDrawingStream(tile$) {
    this.firstTile$ = tile$
    this.firstTile$.subscribe( tile => console.log(tile))
  }


  draw(ctx): void {
    ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
  }

}
