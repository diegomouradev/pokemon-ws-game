import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { mergeScan, skip, skipLast, takeUntil, tap } from 'rxjs/operators';

import { WordService } from 'src/app/shared/services/word.service';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';

@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.scss']
})
export class BoardCanvasComponent implements AfterViewInit, OnDestroy {
  @Input() gameBoardEl: HTMLDivElement;
  @ViewChild('canvas') canvasRef: ElementRef;
  
  errMessage;
  canvas: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
  ctx: CanvasRenderingContext2D;
  drawingDirection: string;
  xInitial: number;
  yInitial: number;
  xFinal: number;
  yFinal: number;
  


  constructor(
    private canvasService: DrawOnCanvasService,
    private wordService: WordService
    ) {}

    seedCoor: object[] = [];
    pokeWordFound$ = this.wordService.getWordFoundObservable();
    pokeCoorSub = this.wordService.getPokeWordActionObservable().pipe(
      skip(1),
      mergeScan( (acc, pokeTile) => pokeTile.coordinates ? of([...acc, pokeTile.coordinates]) : of(this.seedCoor), this.seedCoor),
      // takeUntil(this.pokeWordFound$),
    ).subscribe( coor => {
      coor[0] ? this.canvasService.draw(this.ctx, this.canvasWidth, this.canvasHeight, coor) : console.log(`No coordinates found!`)
    });



  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasHeight = this.gameBoardEl.getBoundingClientRect().height ;
    this.canvasWidth = this.gameBoardEl.getBoundingClientRect().width;
    this.updateCanvasSize();
    this.ctx = this.canvas.getContext('2d');
  }

  updateCanvasSize(): void {
    this.canvas.setAttribute('width', `${this.canvasWidth}`)
    this.canvas.setAttribute('height', `${this.canvasHeight}`)
  }

  ngOnDestroy(): void {
    this.pokeCoorSub.unsubscribe()
  } 

  resetSelection(ctx, canvasHeight, canvasWidth, coors): void {
    this.canvasService.resetSelection(ctx, canvasHeight, canvasWidth, coors);
  }

}
