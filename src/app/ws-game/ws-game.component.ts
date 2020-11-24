import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FillGridService } from './fill-grid.service';
import { PokemonService } from './pokemon.service';
import { IWordList, IPokemonData, ITile } from './ws-game.models';
@Component({
  selector: 'ws-game',
  templateUrl: './ws-game.component.html',
  styleUrls: ['./ws-game.component.scss'],
  providers: [PokemonService, FillGridService]
})
export class WsGameComponent implements OnInit, OnDestroy {
  GRID_WIDTH: number = 20;
  GRID_HEIGHT: number = 20;
  
  pokemonData: IPokemonData;
  pokemonsDataSubscription: Subscription;

  pokemonList: IWordList;
  gameBoard: ITile[][];

  constructor(
    private PokemonService: PokemonService,
    private FillGridService: FillGridService
    ) { }


    
    ngOnInit(): void {
      this.getPokemonData();
      
      // this.gameBoard = this.generateBoard(this.GRID_WIDTH, this.GRID_HEIGHT, this.pokemonList);
    }
    
    getPokemonData() {
      this.pokemonsDataSubscription = this.PokemonService.getPokemonsFirstGen().subscribe(
        (results) => {
          this.pokemonData = results;
          this.buildPokemonList(this.pokemonData);
          return this.gameBoard = this.generateBoard(this.GRID_WIDTH, this.GRID_HEIGHT, this.pokemonList);
        }),
        (error) => {
          console.log(this.pokemonData);
        },
        () => {console.log(`pokemon stream completed`);}
      };
      
    ngOnDestroy(): void {
      this.pokemonsDataSubscription.unsubscribe();
      throw new Error('Method not implemented.');
    }

  buildPokemonList(pokemonData) {
    return this.pokemonList = pokemonData.results.map( (pokemon, index) => {
      return pokemon = {
        word: pokemon.name,
        id: `${index + 1}`,
        isCompleted: false
      }
    });
  }

  generateBoard(gridWidth: number, gridHeight: number, pokemonList: IWordList): ITile[][] {
    return this.FillGridService.generateBoard(gridWidth, gridHeight, pokemonList);
  }

  getGameBoard() {
    return this.gameBoard;
  }

  getPokemonList() {
    return this.pokemonList;
  }
}
