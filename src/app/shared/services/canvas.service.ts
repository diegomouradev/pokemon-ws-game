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
  colors = ['#85FFBD','#FFFB7D','#d4fc79', '#96e6a1']

  getRandomColor():string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const color = this.colors.slice(randomIndex,1)
    return color.pop();
  }

  draw(ctx, canvasHeight, canvasWidth, coors): void {
    ctx.beginPath();

    const lineargradient = ctx.createLinearGradient(0, 0, 600, 600);
    lineargradient.addColorStop(0, '#21D4FD');
    lineargradient.addColorStop(1, '#B721FF');
    ctx.fillStyle = lineargradient;
    ctx.strokeStyle = 'black';
 
    ctx.lineWidth = 1;
    const multiplierX = canvasWidth / 20;
    const multiplierY = canvasHeight / 20;

    const x = coors.at(-1).x * multiplierX + 15;
    const y = coors.at(-1).y * multiplierY + 15;
    const radius = 15;
    const startAngle = 0;
    const endAngle =  2 * Math.PI;
    const clockwise = true;

    ctx.arc( x, y, radius, startAngle, endAngle, clockwise);
    ctx.fill();
    // ctx.stroke();
  
  }

  resetSelection(ctx, canvasWidth, canvasHeight, coordinates): void {
    for(let coors of coordinates) {

      const multiplierX = canvasWidth / 20;
      const multiplierY = canvasHeight / 20;
  
      const x = coors.x * multiplierX ;
      const y = coors.y * multiplierY ;
      ctx.clearRect(x,y,30,30)
    }
  }
}
