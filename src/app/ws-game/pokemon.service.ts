import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IPokemonData } from './ws-game.models';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly ROOT_URL = 'https://pokeapi.co/api/v2/'
  
  //from Bulbasaur to Mew.
  pokemonsFirstGen: Observable<IPokemonData>;
  constructor(private http: HttpClient) {
  }

  getPokemonsFirstGen(): Observable<IPokemonData> {
    let params = new HttpParams().set('limit', '151');
    return this.http.get<IPokemonData>(this.ROOT_URL + 'pokemon/', { params })
    .pipe(tap(data => {console.log(data);
    }), 
    catchError(this.handleError)
    );
  }

  private handleError( error: any) {
    return throwError(error);
  }

}
