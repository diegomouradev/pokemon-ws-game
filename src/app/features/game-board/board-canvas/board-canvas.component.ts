import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { of } from 'rxjs';
import {
  mergeScan,
  skip,
  skipLast,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { WordService } from 'src/app/shared/services/word.service';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';

@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.scss'],
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

  resetLetterSub;
  coordinatesSoFar$;

  constructor(
    private canvasService: DrawOnCanvasService,
    private wordService: WordService
  ) {}

  seedCoor: object[] = [];
  pokeWordFound$ = this.wordService.getWordFoundObservable();
  pokeCoorSub = this.wordService
    .getPokeWordActionObservable()
    .pipe(
      /*- skip: The first value is the initialValue used for reset. */
      skip(1),
      /*- mergeScan: Keep accumulating until the last letter, or
      reset to an empty array. */
      mergeScan(
        (acc, pokeTile) =>
          pokeTile.letterIndex + 1 <= pokeTile.wordLength
            ? of([...acc, pokeTile.coordinates])
            : of(this.seedCoor),
        this.seedCoor
      ),
      tap((result) => {
        return console.log(result);
      }),

      /* Copy of coordinates for erasing 
      the last drawing on the canvas, upon request.
      */
      tap((result) => (this.coordinatesSoFar$ = of(result)))
    )
    .subscribe((coor) => {
      /* If coordinates exist, draw them on the canvas.
       */
      coor[0]
        ? this.canvasService.draw(
            this.ctx,
            this.canvasWidth,
            this.canvasHeight,
            coor
          )
        : console.log(`No coordinates found!`);
    });

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasHeight = this.gameBoardEl.getBoundingClientRect().height;
    this.canvasWidth = this.gameBoardEl.getBoundingClientRect().width;
    this.updateCanvasSize();
    this.ctx = this.canvas.getContext('2d');
  }

  private updateCanvasSize(): void {
    this.canvas.setAttribute('width', `${this.canvasWidth}`);
    this.canvas.setAttribute('height', `${this.canvasHeight}`);
  }

  public resetSelection() {
    /* On user input erase the previous selection,
    that didn't form a world.
     */
    this.resetLetterSub = this.coordinatesSoFar$
      .pipe()
      .subscribe((coordinates) => {
        this.canvasService.resetSelection(
          this.ctx,
          this.canvasWidth,
          this.canvasHeight,
          coordinates
        );
        this.wordService.resetPokeWordSubject();
      });
  }

  ngOnDestroy(): void {
    this.pokeCoorSub.unsubscribe();
    this.resetLetterSub.unsubscribe();
  }
}
