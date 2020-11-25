import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

  @Output()
  pokemonList: IWordList[];
  gameBoard: ITile[][];
  displayList: IWordList[];


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
          this.pokemonList = this.buildPokemonList(this.pokemonData);
          this.gameBoard = this.generateBoard(this.GRID_WIDTH, this.GRID_HEIGHT, this.pokemonList);
          this.displayList = this.FillGridService.getDisplayList();
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
      pokemon.name = pokemon.name.replace(/[^\w]*/gi,"");
      return pokemon = {
        word: pokemon.name,
        id: `${index + 1}`,
        isCompleted: false
      }
    });
  }

  // FINISH THE IMPLEMENTATION OF THE BUTTON
  generateNewGameBoard(displayList) {
    this.FillGridService.setDisplayList(displayList);
 
  }

  generateBoard(gridWidth: number, gridHeight: number, pokemonList: IWordList[]): ITile[][] {
    return this.FillGridService.generateBoard(gridWidth, gridHeight, pokemonList);
  }

  getGameBoard() {
    return this.gameBoard;
  }

  getPokemonList() {
    return this.displayList;
  }
}
