import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { FillGridService } from './fill-grid.service';
import { IWordList, IPokemonData, ITile, ICoordinates } from './ws-game.models';

@Component({
  selector: 'ws-game',
  templateUrl: './ws-game.component.html',
  styleUrls: ['./ws-game.component.scss'],
  providers: [FillGridService],
})
export class WsGameComponent implements OnInit {
  GRID_WIDTH: number = 20;
  GRID_HEIGHT: number = 20;

  pokemonsFirstGen$: Observable<IPokemonData>;
  pokemonData: IPokemonData;

  @Output()
  pokemonList: IWordList[];
  gameBoard: ITile[][];
  displayList: IWordList[];

  constructor(
    private FillGridService: FillGridService,
    private DataService: DataService
  ) {}

  ngOnInit(): void {
    this.pokemonsFirstGen$ = this.DataService.loadPokemonsFirstGen();
    this.pokemonsFirstGen$.subscribe((result) => {
      this.pokemonData = result;
      this.DataService.setData(this.pokemonData);
      this.pokemonList = this.DataService.getPokemonList();
      this.gameBoard = this.FillGridService.generateBoard(
        this.GRID_WIDTH,
        this.GRID_HEIGHT,
        this.pokemonList
      );
      this.displayList = this.FillGridService.getDisplayList();
      // this.FillGridService.setDisplayList(this.displayList)
    });
  }

  getGameBoard(): ITile[][] {
    return this.gameBoard;
  }

  getDisplayList(): IWordList[] {
    return this.displayList;
  }
}
