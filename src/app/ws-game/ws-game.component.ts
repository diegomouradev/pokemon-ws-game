import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FillGridService } from './fill-grid.service';
import { IWordList, IPokemonData, ITile } from './ws-game.models';
@Component({
  selector: 'ws-game',
  templateUrl: './ws-game.component.html',
  styleUrls: ['./ws-game.component.scss'],
  providers: [FillGridService]
})
export class WsGameComponent implements OnInit {
  GRID_WIDTH: number = 20;
  GRID_HEIGHT: number = 20;

  pokemonsFirstGen$: Observable<IPokemonData>;
  pokemonData: IPokemonData;

  @ViewChild('canvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  @ViewChild('grid')
  myGrid: ElementRef<HTMLDivElement>;

  gridDimensions: number[];

  @Output()
  pokemonList: IWordList[];
  gameBoard: ITile[][];
  displayList: IWordList[];

  constructor(
    private FillGridService: FillGridService,
    private DataService: DataService ) {
    
  }

  ngOnInit(): void {
    this.pokemonsFirstGen$ = this.DataService.loadPokemonsFirstGen();
    this.pokemonsFirstGen$.subscribe(
      (result) => {
      this.pokemonData = result;
      this.DataService.setData(this.pokemonData);
      this.pokemonList = this.DataService.getPokemonList();
      this.gameBoard = this.FillGridService.generateBoard(this.GRID_WIDTH, this.GRID_HEIGHT, this.pokemonList);
      this.displayList = this.FillGridService.getDisplayList();
    }); 
 
  }

  getGameBoard() {
    return this.gameBoard;
  }

  getDisplayList() {
    return this.displayList;
  }
}
