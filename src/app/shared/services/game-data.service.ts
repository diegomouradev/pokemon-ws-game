import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IResponse, IPokeData, IDataResponse } from '../interfaces/IPokeData';
import { debug, RxJsLoggingLevel } from '../operators/debug.operator';


@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private ROOT_URL: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  private SVG_URL: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
  constructor(private http: HttpClient) {}

  // HTTP 
  response$ = this.http.get<IResponse>(`${this.ROOT_URL}`).pipe(
    map((response) => response.results as IDataResponse[]),
    shareReplay(),
    catchError(this.handleError)
  );

  pokeData$ = this.response$.pipe(
    map(
      pokeData => {
        let pokeDataObject = pokeData.map((pokemon, index) => (
          { word: pokemon.name === 'mr-mime' ? pokemon.name.split('-').join('') : pokemon.name, 
            urlSvg: `${this.SVG_URL}${index + 1}.svg`, 
            isFound: false
          } as IPokeData));
       
          let pokeDataFilter = pokeDataObject.filter( pokemon => !pokemon.word.includes("nidoran"));
       return pokeDataFilter;
      }
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
