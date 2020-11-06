import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class FillGridService {
  grid: object[] = []

  values = new Constants()
  numberOfWords: number = this.values.NUMBER_OF_WORDS
  wordSize: number = this.values.WORD_SIZE
  gridSize: number = this.values.GRID_SIZE
  words: string[] = this.values.WORD_SAMPLE

  wordSample: object[] = []
  insertionMap: object[] = []
  watchIndex: number[] = []

  constructor() { }

  // Generate a matrix of empty tiles.
  generateGrid(): void  {

    for(let i=0; i < this.gridSize; i++) {
      this.grid[i] = [];
      for(let j=0; j< this.gridSize; j++) {
        this.grid[i][j] = [];
      }
    }
  }

  // Generate Array of sample words as objects.
  // if words are provided as array of strings.
  generateWordsSample(): void {
    for(let word of this.words){
      let pokName = {name: word} 
      this.wordSample.push(pokName);
    };
  }

// Generate random positions corresponding to the first letter of the word
// to be inserted. Also, calculates if the word should be placed top-down or left-to-right 
// based on the [x,y] indexes + the size of grid, and the size of the word, to avoid
// having words getting cut at the board limit.
// Obs: Probably should account for words not crossing over each-other!
generateInsertionMap(): void {
  // the limiting index for a word to start on the grid
  //  otherwise it won't fit.
  const limit = this.gridSize - this.wordSize;
  for( let i = 0; i < this.numberOfWords; i++ ){
    const row: number = this.randomIndex();
    const column: number = this.randomIndex();
    let direction;
    // direction checking to make sure words fit without being cut 
    // on the limits of the board.
    if (row > limit && column > limit) {
      i--;
    } else if ( row > limit && column < column ) {
        direction = 'directionLR'
      } else if ( column > limit && row < limit ) {
        direction = 'directionTB'
        } else {
          let randomBinary = Math.floor(Math.random() * (this.gridSize + i) - i);
          randomBinary % 2 === 0 ?  direction = 'directionLR' : direction = 'directionTB';
        }
      this.insertionMap.push({ row , column , direction });
    }
  }

  // Helper function that generates a random index based on the gridSize.
  randomIndex(): number {
    let randomIndex: number = Math.floor(Math.random() * this.gridSize);
    if(!this.watchIndex.length) {
      this.watchIndex.push(randomIndex);
      return randomIndex;
    }
    for(const index of this.watchIndex) {
      if (index === (randomIndex || (randomIndex + this.wordSize))) {
        this.randomIndex();
      }
      this.watchIndex.push(randomIndex);
      return randomIndex;
    }
  }

  // Access the empty grid to insert the random words generated (API)
  insertWords(): object[] {
      for (let i = 0; i < this.numberOfWords; i++) {
        let indexPositionRow = this.insertionMap[i].row;
        let indexPositionColumn = this.insertionMap[i].column;
        let insertionDirection = this.insertionMap[i].direction;

        if (indexPositionRow === indexPositionRow && insertionDirection === 'directionLR') {
          for (let j = 0; j < this.wordSize; j++) {
            this.grid[indexPositionRow][indexPositionColumn + j] = this.wordSample[i].name.substring(j, j + 1);
          } 
        } else if (indexPositionRow === indexPositionRow && insertionDirection === 'directionTB') {
            for (let j = 0; j < this.wordSize; j++) {
              this.grid[indexPositionRow + j][indexPositionColumn] = this.wordSample[i].name.substring(j, j + 1);
            }
          }
        }
    return this.grid;
  };
  
}
