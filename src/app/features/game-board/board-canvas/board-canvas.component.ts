import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { catchError, concatAll, concatMap, map, repeat, scan, skipUntil, takeUntil, tap } from 'rxjs/operators';
import { WordService } from 'src/app/shared/services/word.service';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';
import { BoardTileComponent } from '../board-tile/board-tile.component';
@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.scss']
})
export class BoardCanvasComponent implements AfterViewInit, OnDestroy {
  canvas: HTMLCanvasElement;
  errMessage;

  wordSoFarSub: Subscription;
  
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



  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasHeight = this.gameBoardEl.getBoundingClientRect().height ;
    this.canvasWidth = this.gameBoardEl.getBoundingClientRect().width;
    this.updateCanvasSize();
    this.ctx = this.canvas.getContext('2d');
  }

  wordSoFar$ = this.wordService.getWord().pipe().subscribe(
    word => {
      const wordSoFar = word[0];
        this.canvasService.draw(this.ctx, this.canvasHeight, this.canvasWidth, wordSoFar.coordinates);
    }
  )
  
  updateCanvasSize(): void {
    this.canvas.setAttribute('width', `${this.canvasWidth}`)
    this.canvas.setAttribute('height', `${this.canvasHeight}`)
  }

  markWordFound($event) {
    
  }

  ngOnDestroy(): void {
 
  }

}
