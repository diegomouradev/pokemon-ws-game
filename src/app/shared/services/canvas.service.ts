import { Injectable } from '@angular/core';
import { concat, fromEvent, merge, Observable, Subject } from 'rxjs';
import { first, map, take, takeUntil } from 'rxjs/operators';
import { IPokeTile } from '../interfaces/IPokeTile';

@Injectable({
  providedIn: 'root'
})
export class DrawOnCanvasService {



  constructor() { }

  draw(ctx, canvasHeight, canvasWidth, coordinatesSoFar): void {
    if(ctx) {
      ctx.strokeStyle = 'green',
      ctx.lineWidth = 2;

      const multiplierX = canvasWidth / 20;
      const multiplierY = canvasHeight / 20;
      for(let [index, coor] of coordinatesSoFar.entries()){
        if(index > 0) {
          ctx.strokeRect( coor.x * multiplierX, coor.y * multiplierY, 20, 20);
        }
        
      }
   
    }
  
  }
}
