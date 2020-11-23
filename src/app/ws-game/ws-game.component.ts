import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { IWordList, IPokemonData } from './ws-game.models';

const ALPHABET: string = 'abcdefghijklmnoprstuvwy'
const GRID_WIDTH: number = 20;
const GRID_HEIGHT: number = 20;
const GRID_SIZE: number = 20;
const DIRECTIONS: string[] = [
  'horizontal',
  'horizontalReversed',
  'vertical',
  'verticalReversed',
  'diagonal'
]

@Component({
  selector: 'ws-game',
  templateUrl: './ws-game.component.html',
  styleUrls: ['./ws-game.component.scss'],
  providers: [PokemonService]
})
export class WsGameComponent implements OnInit {
  pokemonData: IPokemonData;
  pokemonList: IWordList[] = [];


  constructor(private PokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonData();
    
  }

  getPokemonData() {
    this.PokemonService.getPokemonsFirstGen().subscribe(
      data => {
        this.pokemonData = data;
        this.buildPokemonList();
        console.log(this.pokemonData.results);
      }
    );
  };

  buildPokemonList() {
    for( let [index, pokemon] of this.pokemonData.results.entries()) {
      this.pokemonList.push({
        word: pokemon.name,
        id: `${index + 1}`,
        isCompleted: false
      })
    }
  }

}
