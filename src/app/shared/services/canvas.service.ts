import { Injectable } from '@angular/core';
import { concat, fromEvent, merge, Observable, Subject } from 'rxjs';
import { first, map, take, takeUntil } from 'rxjs/operators';
import { IPokeTile } from '../interfaces/IPokeTile';

@Injectable({
  providedIn: 'root'
})
export class DrawOnCanvasService {
  wordSofar$;

  constructor() { }

  draw(ctx, canvasHeight, canvasWidth, coors): void {
    ctx.beginPath();

    const lineargradient = ctx.createLinearGradient(0, 0, 60, 60);
    lineargradient.addColorStop(0, '#d4fc79');
    lineargradient.addColorStop(1, '#96e6a1');
    ctx.fillStyle = lineargradient;

 
    ctx.lineWidth = 2;
    const multiplierX = canvasWidth / 20;
    const multiplierY = canvasHeight / 20;

    const x = coors.at(-1).x * multiplierX + 9.7;
    const y = coors.at(-1).y * multiplierY + 9.4;
    const radius = 10;
    const startAngle = 0;
    const endAngle =  2 * Math.PI;
    const clockwise = true;



    ctx.arc( x, y, radius, startAngle, endAngle, clockwise);
    ctx.fill();
  
  }

  resetSelection(ctx, canvasWidth, canvasHeight, coordinates): void {
    for(let coors of coordinates) {

      const multiplierX = canvasWidth / 20;
      const multiplierY = canvasHeight / 20;
  
      const x = coors.x * multiplierX ;
      const y = coors.y * multiplierY ;
      ctx.clearRect(x,y,20,20)
    }
  }
}
