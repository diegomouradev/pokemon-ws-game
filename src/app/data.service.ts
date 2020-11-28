import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemonData, IWordList } from './ws-game/ws-game.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly ROOT_URL = 'https://pokeapi.co/api/v2/'

  pokemonList: IWordList[];
  pokemonData: IPokemonData;
  
  constructor(private http: HttpClient) {
  }

  loadPokemonsFirstGen(): Observable<IPokemonData> {
    let params = new HttpParams().set('limit', '151');
    return this.http.get<IPokemonData>(this.ROOT_URL + 'pokemon/', { params });
  }

  setData(pokemonData) {
    this.pokemonList = pokemonData.results.map( (pokemon, index) => {
      pokemon.name = pokemon.name.replace(/[^\w]*/gi,"");
      return pokemon = {
        word: pokemon.name,
        id: `${index + 1}`,
        isCompleted: false
      }
    });
  }

  getPokemonList(): IWordList[] {
    return this.pokemonList;
  }
  
  
}