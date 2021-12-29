import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, concatAll, concatMap, map, mergeMap, mergeScan, repeat, scan, skip, skipUntil, takeUntil, tap } from 'rxjs/operators';
import { IPokeData, IWordSoFar } from 'src/app/shared/interfaces/IPokeData';
import { IPokeTile } from 'src/app/shared/interfaces/IPokeTile';
import { WordService } from 'src/app/shared/services/word.service';
import { DrawOnCanvasService } from '../../../shared/services/canvas.service';
import { BoardTileComponent } from '../board-tile/board-tile.component';
import { GenerateNewGameBoardService } from '../services/game-board.service';
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
  
  constructor(private canvasService: DrawOnCanvasService,
    private wordService: WordService) {}

    seedCoor: object[] = [];
    wordFound$ = this.wordService.getWordsFondObservable();
    pokeWordCoorAction$ = this.wordService.getPokeWordCoorActionObservable();
    pokeWordCoorSoFarSub = this.pokeWordCoorAction$.pipe(
      mergeScan( (acc, coor) => of([...acc, coor]), this.seedCoor),
    ).subscribe( coor => this.ctx ? this.canvasService.draw(this.ctx, this.canvasWidth, this.canvasHeight, coor) : console.log('Context not initialized!'),
    complete => complete())

  ngOnInit(): void {
   
  }

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
    this.pokeWordCoorSoFarSub.unsubscribe()
  } 

}
