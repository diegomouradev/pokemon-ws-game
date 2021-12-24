import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, fromEvent, merge, Observable } from 'rxjs';
import { catchError, concatAll, concatMap, map, scan, skipUntil, takeUntil, tap } from 'rxjs/operators';
import { WordService } from 'src/app/shared/services/word.service';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';
import { BoardTileComponent } from '../board-tile/board-tile.component';
@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.scss']
})
export class BoardCanvasComponent implements AfterViewInit {
  canvas: HTMLCanvasElement;
  errMessage;

  mouseDown$: Observable<Event>;
  mouseMove$: Observable<Event>;;
  mouseUp$: Observable<Event>;
  drag$: Observable<Event>;
  
  constructor(
    private canvasService: DrawOnCanvasService,
    private wordService: WordService) { 
   
  }

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

  // wordSubscription;
  coordinatesSoFar: object[];

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasHeight = this.gameBoardEl.getBoundingClientRect().height ;
    this.canvasWidth = this.gameBoardEl.getBoundingClientRect().width;
    this.updateCanvasSize();
    this.ctx = this.canvas.getContext('2d');
  }

  wordSubscription = this.wordService.getWord().subscribe(
    response => {
      this.canvasService.draw(this.ctx, this.canvasHeight, this.canvasWidth, response.coordinates);
    },
    error => {
      console.log(`An error occurred: ${error.message}`)
    }
  );

  updateCanvasSize(): void {
    this.canvas.setAttribute('width', `${this.canvasWidth}`)
    this.canvas.setAttribute('height', `${this.canvasHeight}`)
  }


}
