export interface IBoardGenerator {
	generateBoard(gridSize: number, wordList: IList[]): ITile[][];
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

export interface IList {
  word: string;
  id?: string;
  completed: boolean;
}