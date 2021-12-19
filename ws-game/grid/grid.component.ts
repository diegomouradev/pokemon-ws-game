import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IWordList, ITile, ICoordinates } from '../ws-game.models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewChecked {
  word: string[] = [];
  canvas: HTMLCanvasElement;

  @Input()
  gameBoard: ITile[][];
  @Input()
  displayList: IWordList[];
  @Input()
  tile: ITile;

  @Output()
  onWordFound = new EventEmitter<IWordList[]>();

  @ViewChild('gridcontainer') grid: ElementRef;
  @ViewChild('canvas') canvasRef: ElementRef;
  canvaHeight: number;
  canvaWidth: number;
  ctx: CanvasRenderingContext2D;
  drawingDirection: string;
  xInitial: number;
  yInitial: number;
  xFinal: number;
  yFinal: number;
  constructor() {}

  ngOnInit(): void {}

  buildWord($event): void {
    if ($event.isWord && $event.letterIndex === 0) {
      this.word.push($event.letter);
      this.highlightLetter($event);
    } else if ($event.isWord && $event.letterIndex === 'wordEnd') {
      this.word.push($event.letter);
      this.highlightLetter($event);
      this.isWordAMatch();
    } else if ($event.isWord) {
      this.word.push($event.letter);
      this.highlightLetter($event);
    }
  }

  isWordAMatch(): void {
    const wordToCheck: string = this.word.join('');
    for (let iWord of this.displayList) {
      if (wordToCheck === iWord.word) {
        iWord.isCompleted = true;
        this.onWordFound.emit(this.displayList);
        console.log(`You caught a wild ${iWord.word}`);
        this.drawOnCanvas();
        this.word = [];
      }
    }
  }

  ngAfterViewChecked(): void {
    this.canvas = this.getCanvas();
    this.updateCanvaSize();
    this.ctx = this.canvas.getContext('2d');
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  updateCanvaSize(): void {
    this.canvaHeight = this.grid.nativeElement.getBoundingClientRect().height;
    this.canvaWidth = this.grid.nativeElement.getBoundingClientRect().width;
  }

  selectLetter($event): void {
    this.ctx.fillStyle = 'green';
    let x = (this.canvaWidth / 20) * $event.indexColumn;
    let y = (this.canvaHeight / 20) * $event.indexRow;
    this.ctx.fillRect(x, y, 25, 25);
  }

  drawOnCanvas(): void {
    let rectSize = (this.xFinal - this.xInitial) * 25;
    let x = (this.canvaWidth / 20) * this.xInitial;
    let y = (this.canvaHeight / 20) * this.yInitial;
    this.ctx.clearRect(x, y, rectSize, rectSize);
    // this.ctx.beginPath();
    // this.ctx.moveTo(x, y); // starting point at the top of the triangle
    // this.ctx.lineTo(250, 100); // line to right bottom corner
    // this.ctx.lineTo(50, 100); // line to left bottom corner
    // this.ctx.stroke();
  }

  highlightLetter($event): void {
    this.ctx.fillStyle = 'green';
    this.drawingDirection = $event.direction;
    this.xInitial = $event.indexColumn;
    this.yInitial = $event.indexRow;
    let x = (this.canvaWidth / 20) * this.xInitial;
    let y = (this.canvaHeight / 20) * this.yInitial;
    this.ctx.fillRect(x, y, 25, 25);
  }
}
