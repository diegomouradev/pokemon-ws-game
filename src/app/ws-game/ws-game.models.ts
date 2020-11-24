// Array of objects containing pokemon names and URL for complete data.
export interface IPokemonData {
  count?: number;
  next?: string;
  previous?: null;
  results?: object[];
}

// Shared with grid.component and list.component
export interface IWordList {
  word: string;
  id?: string;
  isCompleted: boolean;
}

export interface IBoardGenerator {
	generateBoard(gridWidth: number, gridHeight: number, pokemonList: IWordList): ITile[][];
}

export interface ITile {
	letter: string;
  indexRow?: number;
  indexColumn?: number;
  isSelected?: boolean;
  isWord?: boolean;
  letterPosition?: number | number[];
  highlightStart?: boolean;
}

export interface ILocation {
  indexRow: number;
  indexColumn: number;
  direction: string;
  overlap: number;
}
