import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DPokemon } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly ROOT_URL = 'https://pokeapi.co/api/v2/'
  
  //from Bulbasaur to Mew.
  pokemonsFirstGen: Observable<DPokemon>;

  constructor(private http: HttpClient) {
    
  }

  getPokemonsFirstGen() {
    let params = new HttpParams().set('limit', '151');
    return this.pokemonsFirstGen = this.http.get<DPokemon>(this.ROOT_URL + 'pokemon/', { params });
  }

}
