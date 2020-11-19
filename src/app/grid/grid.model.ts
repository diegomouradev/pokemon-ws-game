export interface IBoardGenerator {
	generateBoard(gridSize: number, wordList: IList[]): ITile[][];
}

export interface ITile {
	letter: string;
  indexRow?: number;
  indexColumn?: number;
  isSelected?: boolean;
  isWord?: boolean;
  // isStartOrEnd?: string;
  // change the name and pass in a zero indexed base number for accurate checking
  letterPosition?: number | number[];
}

export interface ILocation {
  indexRow: number;
  indexColumn: number;
  direction: string;
  overlap: number;
}

export interface IList {
  word: string;
  index?: number;
  completed: boolean;
}