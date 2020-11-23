import { Component, Input, OnInit, Output } from '@angular/core';
import { POKEMON, WORD_LIST } from '../constants';
import { IList } from '../grid/grid.model';
import { PokemonService } from '../pokemon.service';
import { DPokemon } from 'src/app/data.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'grid-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [PokemonService]
})
export class ListComponent implements OnInit {
  wordList: IList[] = WORD_LIST;
  pokeApi: DPokemon;

  @Input()
  iWord: IList;
  removeSVGAttributes: string[]
  

  constructor(private PokemonService: PokemonService) { 
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.PokemonService.getPokemonsFirstGen().subscribe(
      data => {
        this.pokeApi = data;
        console.log(data);
      }
    );
  };


  markWordFound($event) {
    this.wordList = $event;
  }

}
