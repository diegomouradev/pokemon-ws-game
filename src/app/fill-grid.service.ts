import { Injectable } from '@angular/core';
import { WORD_LIST, GRID_WIDTH, GRID_HEIGHT, DIRECTIONS, ALPHABET, GRID_SIZE } from './constants';
import { ITile , IBoardGenerator, ILocation  } from './grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class FillGridService implements IBoardGenerator {
  grid: ITile[][] = []
  
  alphabet: string = ALPHABET
  words: string[] = WORD_LIST 
  gridWidth: number = GRID_WIDTH
  gridHeight: number = GRID_HEIGHT
  gridSize: number = GRID_SIZE
  directions: string[] = DIRECTIONS
  
  constructor() { }
  generateBoard(gridSize: number, wordList: string[]): ITile[][] {
    this.words = wordList;
    this.gridSize = gridSize;
    this.generateGrid();
    this.placeWord();
    return this.grid;
  }
  
  // Given the direction calculates the next Square.
  nextTile: object = {
    horizontal: ( indexColumn: number,indexRow: number, distance:number) => ( {indexColumn: indexColumn + distance, indexRow } ),
    vertical: ( indexColumn: number,indexRow: number, distance:number) => ( { indexColumn , indexRow: indexRow  + distance } ),
    diagonal: ( indexColumn: number,indexRow: number, distance:number) => ( { indexColumn: indexColumn + distance, indexRow: indexRow + distance})
  }

  // given the grid dimensions, and the tile position check if the word fits.
  isDirectionValid: object = {
    horizontal: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => width >= indexColumn + wordLength,
    vertical: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => height >= indexRow + wordLength,
    diagonal: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => (width >= indexColumn + wordLength) && (height >= indexRow + wordLength)
  }

  // If the result of isDirectionValid returns false.
  skipTiles: object = {
    horizontal: (indexColumn: number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 1}),
    vertical: (indexColumn: number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 100}),
    diagonal: ( indexColumn:number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 1})
  }
  
  // Generate grid of empty tiles.
  generateGrid(): void {
    for(let i=0; i < this.gridHeight; i++) {
      this.grid.push([]);
      for(let j=0; j< this.gridWidth; j++) {
        this.grid[i].push({letter:'_'});
      }
    }
  }
  
  pickRandomWord(): string {
    let length = this.words.length;
    let randomWord = this.words.splice((Math.floor(Math.random() * length)), 1);
    return randomWord[0];
  }

  // Find all available locations to place the word in every direction.
  getAvailableLocations(word): ILocation[] {

    const locations: ILocation[] = [];
    const wordLength = word.length;

    for( let j = 0; j < this.directions.length; j++){

      const direction = this.directions[j];
      const checkDirection = this.isDirectionValid[direction];
      const nextTile = this.nextTile[direction];
      let indexColumn = 0;
      let indexRow = 0; 

      while( indexRow < this.gridHeight) {
        // check if the word fits in the space available at all.
        if(checkDirection(this.gridWidth, this.gridHeight, indexColumn, indexRow, wordLength )) {
          // If it fits, check the next tile for the length of the word to make sure words don't overlap.
          let isOverlap = this.checkForOverlap(word, indexColumn, indexRow, nextTile);

          if(isOverlap === 0) {
            locations.push({ indexColumn, indexRow, direction});
          }
          indexColumn++;
          if (indexColumn >= this.gridWidth) {
            indexColumn = 0;
            indexRow++;
          }
        } else {
          let skipDirection = this.skipTiles[direction];
          skipDirection = skipDirection(indexColumn, indexRow, wordLength);
          indexColumn = skipDirection.indexColumn;
          indexRow = skipDirection.indexRow;
        }
      }
    }
    return locations;
  };

  checkForOverlap( word, indexColumn, indexRow, getNextTile ): number {
    let overlap: number = 0;

    for(let k = 0; k < word.length; k++) {
      let nextTile = getNextTile( indexColumn, indexRow, k );
      let tile = this.grid[nextTile.indexRow][nextTile.indexColumn];

      if(tile.letter === '_') {
        overlap = overlap;
      } else {
        overlap--;
      }
    }
    return overlap;
  }

  placeWord(): ITile[][] {
    while(this.words.length >= 1) {
      // get random word to place in the grid.
      const word: string = this.pickRandomWord();
      // get all available locations for placing the word.
      const locations = this.getAvailableLocations(word);
      // select available locations at random.
      const randomLocation: ILocation = locations[Math.floor(Math.random() * locations.length)];
      // place word in the selected location.
      this.placeWordInGrid( word, randomLocation);
    }
    return this.grid;
  }
  
  placeWordInGrid( word: string, randomLocation: ILocation ): void {
    for (let i = 0, length = word.length; i < length; i++) {
      let next = this.nextTile[randomLocation.direction];
      next = next(randomLocation.indexColumn, randomLocation.indexRow, i);
      let tile: ITile = {
        letter: word[i],
        indexRow: next.indexRow,
        indexColumn: next.indexColumn,
        isWord: true, 
        isSelected: false
      };
      this.grid[next.indexRow][next.indexColumn] = tile;
    }
  };
  
};
