import {  AfterViewChecked, AfterViewInit, Component,ElementRef,Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { concat, fromEvent, merge, Observable, Subject } from 'rxjs';
import { first, map, take, takeUntil, concatAll, mergeAll, concatMap, repeat, skipUntil, tap } from 'rxjs/operators';

import { ITile } from 'src/app/shared/interfaces/ITile';
import { DrawOnCanvasService } from 'src/app/shared/services/canvas.service';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { WordService } from 'src/app/shared/services/word.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent implements AfterViewInit, OnDestroy {

  @Input() tile: ITile;
  wordSoFar: string;
  wordList: string[];
  coordinatesSoFar: object[];

  wordSubscription;
  wordListSubscription;

  constructor(
    private wordService: WordService, 
    private gameDataService: GameDataService,
    private drawOnCanvasService: DrawOnCanvasService
    ) {}

  ngAfterViewInit():void {
    this.wordSubscription = this.wordService.getWord().subscribe(
      response => {
        this.wordSoFar = response.word;
        this.coordinatesSoFar = response.coordinates;
      },
      error => {
        console.log(`An error occurred: ${error.message}`)
      }
    );

    this.wordListSubscription = this.gameDataService.wordList$.subscribe(
      response => {
        this.wordList = response;
      },
      error => {
        console.log(`An error occurred: ${error.message}`)
      }
    );
  }
  
  onTileClick(): void {
    this.wordService.buildWord(this.wordSoFar, this.coordinatesSoFar, this.tile)
    const isWordFound = this.wordService.checkWordList(this.wordSoFar, this.wordList);
    
  }

  ngOnDestroy():void {
    this.wordSubscription.unsubscribe();
    this.wordListSubscription.unsubscribe();
  }
}