import { Component, OnInit } from '@angular/core';
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
  constructor(private gameDataService: GameDataService,
    private generateNewGamBoardService: GenerateNewGameBoardService) { }

  
  pokemons$ = this.gameDataService.pokeData$.pipe(
    map(
      pokemons => pokemons.filter( pokemon => this.generateNewGamBoardService.pokemonsInTheBoard.indexOf(pokemon.name) >= 0 )
    ),
    catchError(err => this.errorMessage = err)
  )





}
