import { Component, Input, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { GameDataService } from 'src/app/shared/services/game-data.service';
import { GenerateNewGameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent   {
  errorMessage;

  constructor(private generateNewGamBoardService: GenerateNewGameBoardService) { }
  
  @Input() listConfig: string;

  
  pokeList$ = this.generateNewGamBoardService.pokeData$
}
