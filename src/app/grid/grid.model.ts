export class Grid { 
}

export interface IBoardGenerator {
	generateBoard(gridSize: number, wordList: string[]): ITile[][];
}

export interface ITile {
	letter: string;
  indexRow: number;
  indexColumn: number;
  isSelected: boolean;
  isWord: boolean;
  isRandom: boolean;
}
