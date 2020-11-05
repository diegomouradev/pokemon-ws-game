import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class FillGridService {
  
  values = new Constants();
  numberOfWords: number = this.values.NUMBER_OF_WORDS;
  wordSize: number = this.values.WORD_SIZE
  gridSize: number = this.values.GRID_SIZE;
  words: string[] = this.values.WORD_SAMPLE;
  
  
  

  constructor() { }

  // Generate a matrix of empty tiles.
  generateGrid()  {
    let grid = [];
    for(let i=0; i < this.gridSize; i++) {
      grid[i] = [];
      for(let j=0; j< this.gridSize; j++) {
        grid[i][j] = ['_'];
      }
    }
    
    return grid;
  }

  // Generate Array of sample words as objects.
  // if words are provided as array of strings.
  generateWordsSample(): object[] {
    return this.words.map( function(word) {
      const wordSample: object = {
        name: word,
        
      }
      return new Object(wordSample);
    });
  }

// Generate random positions corresponding to the first letter of the word
// to be inserted. Also, calculates if the word should be placed top-down or left-to-right 
// based on the [x,y] indexes + the size of grid, and the size of the word, to avoid
// having words getting cut at the board limit.
// Obs: Probably should account for words not crossing over each-other!
generateInsertionMap() {
  // the limiting index for a word to start on the grid
  //  otherwise it won't fit.
  const limit = this.gridSize - this.wordSize;
  const insertionMap = [];
  for( let i = 0; i < this.numberOfWords; i++ ){
    const row = Math.floor(Math.random() * (this.gridSize - i) + i);
    const column = Math.floor(Math.random() * (this.gridSize - i) + i);
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
          let randomBinary = Math.floor((Math.random() * 10) % 2 );
          randomBinary === 0 ?  direction = 'directionLR' : direction = 'directionTB';
        }
      insertionMap.push({ row , column , direction });
    }
    return insertionMap;
  }

  // Access the empty grid to insert the random words generated (API)
  insertWords(grid) {
    let numberOfWords: number = this.numberOfWords;
    let insertionMap: {} = this.generateInsertionMap();
    let wordSample: {} = this.generateWordsSample();
    grid.map( function(row, index) {
      for (let i = 0; i < numberOfWords; i++) {
        let indexPositionRow = insertionMap[i].row;
        let indexPositionColumn = insertionMap[i].column;
        let insertionDirection = insertionMap[i].direction;
        if (index === indexPositionRow && insertionDirection === 'directionLR') {
          for (let j = 0; j < 5; j++) {
            row[indexPositionColumn + j][0] = wordSample[i].name.substring(j, j + 1);
          } 
        } else if (index === indexPositionRow && insertionDirection === 'directionTB') {
            for (let j = 0; j < 5; j++) {
              grid[index + j][0] = wordSample[i].name.substring(j, j + 1);
            }
          }
        }
      return row;
    })
  };
  
}
