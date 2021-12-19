import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Idata } from '../interfaces/idata';
import { Ipokemon } from '../interfaces/ipokemon';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private ROOT_URL: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor(private http: HttpClient) {}

  response$ = this.http.get<Idata>(`${this.ROOT_URL}`).pipe(
    map((response) => response.results as Ipokemon[]) ,
    catchError(this.handleError)
  );

  pokeData$ = this.response$.pipe(
    map(
      pokeData => pokeData.filter( pokemon => !pokemon.name.includes("nidoran"))
    ),
    map(
      (pokeData) =>
        pokeData.map((pokemon, index) => ({
          ...pokemon,
          svg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            index + 1
          }.svg`,
        
        }))
    ),
    catchError(this.handleError)
  )

  wordList$ = this.pokeData$.pipe(
    map(
      pokeData => pokeData.map( pokemon => pokemon.name)
    ),
    catchError(this.handleError)
  )

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
