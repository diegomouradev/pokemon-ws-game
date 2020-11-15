import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants';
import { ITile , IBoardGenerator  } from './grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class FillGridService {
  values = new Constants()
  tile: ITile;

  ALPHABET: string = 'abcdefghijklmnoprstuvwy';
  
  grid: object[][] = []
  
  words: string[] = this.values.WORD_LIST 
  gridWidth: number = this.values.GRID_WIDTH
  gridHeight: number = this.values.GRID_HEIGHT
  gridSize: number = this.values.GRID_HEIGHT
  directions: string[] = this.values.DIRECTIONS
  
  constructor() { }
  
  // Generate grid of empty tiles.
  generateGrid(): void {
    for(let i=0; i < this.gridHeight; i++) {
      this.grid.push([]);
      for(let j=0; j< this.gridWidth; j++) {
        this.grid[i].push(['_']);
      }
    }
  }
  
  pickRandomWord(): string {
    let length = this.words.length;
    let randomWord = this.words.splice((Math.floor(Math.random() * length)), 1);
    return randomWord[0];
  }
  
 // y|* * *
  // y|    
  // y|    *
  // y|    *
  // y|    *
  // y| *  
  // y|  * 
  // y|   * 
  // y|_ _ _ _ _ 
  //   x x x x x
  
  // Tile = [x,y]
  
  // direction is how either x or y change given a certain distance (word.length).
  // example: word = 'Sun'
  
  // S U N
  // 1 2 3
  
  // Horizontal:  y = y && x = x + 1 | x = x + 1 | x = x + 1 (3 times)
  // Vertical: x = x && y = y + 1 | y = y + 1 | y = y + 1 (3 times)
  // Diagonal: y = y + 1, x = x + 1 | y = y + 1, x = x + 1 | y = y + 1, x = x + 1 (3 times)

  // Given the direction calculates the next Square.
  nextTile: object = {
    horizontal: ( indexColumn: number,indexRow: number, distance:number) => ( {indexColumn: indexColumn + distance, indexRow } ),
    vertical: ( indexColumn: number,indexRow: number, distance:number) => ( { indexColumn , indexRow: indexRow  + distance } ),
    diagonal: ( indexColumn: number,indexRow: number, distance:number) => ( { indexColumn: indexColumn + distance, indexRow: indexRow + distance})
  }

  //     _ _ _ _ _ _ _ _ _ 
  // 9 y|        C L O U D|
  // 8 y|                 |
  // 7 y|                 |
  // 6 y|                 |
  // 5 y|    C           C|
  // 4 y|      L         L|                 
  // 3 y|        O       O|
  // 2 y|          U     U|
  // 1 y|_ _ _ _ _ _ D _ D| 
  //     x x x x x x x x x
  //     1 2 3 4 5 6 7 8 9 

  // Given the direction, the word, and the grid size it checks all tile where is possible to fit the word.
  isDirectionValid: object = {
    horizontal: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => width >= indexColumn + wordLength,
    vertical: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => height >= indexRow + wordLength,
    diagonal: ( width: number, height: number, indexColumn:number, indexRow:number, wordLength:number ) => (width >= indexColumn + wordLength) && (height >= indexRow + wordLength)
  }

  // If the result of isDirectionValid returns false.
  changeDirections: object = {
    // stat looking from indexColumn 0 at the next row.
    horizontal: (indexColumn: number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 1}),
    vertical: (indexColumn: number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 100}),
    diagonal: ( indexColumn:number, indexRow: number, wordLength: number) => ({indexColumn: indexColumn = 0, indexRow: indexRow + 1})
  }

  getAvailableLocations(word): object[] {
    // given a direction and a word find the possible locations for placing the word
    const locations: object[] = [];
    const wordLength = word.length;
    const width = this.gridWidth
    const height = this.gridHeight

    for( let j = 0; j < this.directions.length; j++){

      const direction = this.directions[j];
      const checkDirection = this.isDirectionValid[direction];
      const getNextTile = this.nextTile[direction];
      let indexColumn = 0;
      let indexRow = 0; 

      while( indexRow < height) {
        // check if the word fits in the space available at all.
        if(checkDirection(width, height, indexColumn, indexRow, wordLength )) {
          // If it fits, check the next tile for the length of the word to make sure words don't overlap.
          let isOverlap = this.checkForOverlap(word, indexColumn, indexRow, getNextTile);

          if(isOverlap === 0) {
            locations.push({ indexColumn, indexRow, direction});
          }
          indexColumn++;
          if (indexColumn >= width) {
            indexColumn = 0;
            indexRow++;
          }
        } else {
          let skipDirection = this.changeDirections[direction];
          skipDirection = skipDirection(indexColumn, indexRow, wordLength);
          indexColumn = skipDirection.indexColumn;
          indexRow = skipDirection.indexRow;
        }
      }
    }
    return locations;
  };

  checkForOverlap(word, indexColumn, indexRow, getNextTile): number {
    let overlap: number = 0;

    for(let k = 0; k < word.length; k++) {
      let nextTile = getNextTile( indexColumn, indexRow, k);
      let tile = this.grid[nextTile.indexRow][nextTile.indexColumn];

      if(tile[0] === '_') {
        overlap = overlap;
      } else {
        overlap--;
      }
    }
    return overlap;
  }

  placeWord(): object[][] {
    while(this.words.length >= 1) {
      // get random word to place in the grid.
      const word = this.pickRandomWord();
      // get all available locations for placing the word.
      const locations = this.getAvailableLocations(word);

      // select available locations at random.
      const randomLocation: object = locations[Math.floor(Math.random() * locations.length)];
      this.placeWordInGrid( word, randomLocation);
      
    }
    return this.grid;
  }
  
  placeWordInGrid( word, randomLocation ): object[][] {

    for (let i = 0, length = word.length; i < length; i++) {
      let next = this.nextTile[randomLocation.direction];
      next = next(randomLocation.indexColumn, randomLocation.indexRow, i);
      this.grid[next.indexRow][next.indexColumn] = word[i];
    }

    return this.grid;
  };
  
};
