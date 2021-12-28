import {  AfterViewChecked, AfterViewInit, Component,ElementRef,Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { concat, forkJoin, fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { first, map, take, takeUntil, concatAll, mergeAll, concatMap, repeat, skipUntil, tap, catchError } from 'rxjs/operators';
import { IPokeData, IWordSoFar } from 'src/app/shared/interfaces/IPokeData';

import { IPokeTile, IPokeTileCoor } from 'src/app/shared/interfaces/IPokeTile';
import { DrawOnCanvasService } from 'src/app/shared/services/canvas.service';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { WordService } from 'src/app/shared/services/word.service';
import { EventEmitter } from '@angular/core';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent implements  OnDestroy {

  @Input() tile: IPokeTile;
  @Output() wordIsFound = new EventEmitter();
  constructor(
    private wordService: WordService, 
    private gameBoardService: GenerateNewGameBoardService,
    private drawOnCanvasService: DrawOnCanvasService
    ) {}

    wordSoFar: IWordSoFar[];
    pokeList: IPokeData[];

    wordSoFarSub: Subscription = this.wordService.getWord().subscribe(
      wordSoFar =>  this.wordSoFar = wordSoFar
    );
    pokeListSub: Subscription = this.gameBoardService.pokeData$.subscribe(
      pokeList => this.pokeList = pokeList
    );
  
  onTileClick(): void {
    this.wordService.buildWord(this.wordSoFar, this.tile, this.pokeList)
    const isWordFound = this.wordService.checkWordList(this.wordSoFar,this.pokeList);
    this.wordService.resetWord()
  }

  ngOnDestroy():void {
    this.wordSoFarSub.unsubscribe();
    this.pokeListSub.unsubscribe();
  }
}