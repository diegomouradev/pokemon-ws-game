export interface IBoardGenerator {
	generateBoard(gridSize: number, wordList: string[]): ITile[][];
}

export interface ITile {
	letter: string;
  indexRow?: number;
  indexColumn?: number;
  isSelected?: boolean;
  isWord?: boolean;
}

export interface ILocation {
  indexRow: number;
  indexColumn: number;
  direction: string;
}
