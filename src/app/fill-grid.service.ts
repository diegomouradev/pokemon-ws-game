import { Injectable } from '@angular/core';
import { generate } from 'rxjs';
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
  insertionMap = []
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

  // Generate random positions corresponding to the first letter of the word
  // to be inserted. Also, calculates if the word should be placed top-down or left-to-right 
  // based on the [x,y] indexes + the size of grid, and the size of the word, to avoid
  // having words getting cut at the board limit.
  // Obs: Probably should account for words not crossing over each-other!
  generateInsertionMap(): void {
    for(let word of this.words) {
      let direction;
      const randomDirection: boolean = ((Math.floor(Math.random() * this.gridSize)) % 2 === 0);
            randomDirection ?  direction = 'left-to-right' : direction = 'top-to-bottom';
      // the limiting index for a word to start on the grid
      //  otherwise it won't fit.
      const limitToStartInsertion = this.gridSize - word.length;
      const indexesPosition: number[] = this.generateRandomIndex(direction, limitToStartInsertion, word);
      this.insertionMap.push({ row: indexesPosition[0] , column: indexesPosition[1] , direction , word})
    }
   
  }

  // Helper function that generates a random index based on the gridSize.
  generateRandomIndex(direction, limitToStartInsertion, word): number[] {
    const randomRow: number = Math.floor(Math.random() * (this.gridSize - (direction === 'top-to-bottom' ? limitToStartInsertion : 0 )));
    const randomColumn: number = Math.floor(Math.random() * (this.gridSize - (direction === 'left-to-right' ? limitToStartInsertion : 0 )));
    const rowIndexes: number[] = Array.from(new Array(word.length).fill(randomRow), (x = randomRow,i = 0) => x = x + i);
    const columnIndexes: number[] = Array.from(new Array(word.length).fill(randomColumn), (x = randomColumn, i = 0) => x = x + i);
    this.watchIndex.push(...columnIndexes,...rowIndexes);

    if(this.watchIndex.length || this.watchIndex.length) {
      const isIndexRow: number[] = this.watchIndex.filter( (x,randomRow) => x === randomRow);
      const isIndexColumn: number[] = this.watchIndex.filter( (x, randomColumn)  => x === randomColumn);
      if(isIndexRow.length && isIndexColumn.length){
        this.generateRandomIndex(direction, limitToStartInsertion, word);
      } 
    } 
    let arrayOfIndexes = [];
    arrayOfIndexes.push(randomRow,randomColumn);
    return arrayOfIndexes;
  }

  // Access the empty grid to insert the random words generated (API)
  insertWords(): object[] {
    for(let map of this.insertionMap) {
      if(map.direction === 'left-to-right') {
        for(let i = 0; i < map.word.length; i++){
          this.grid[map.row][map.column + i] = map.word.substring(i, i + 1);
        } 
      } else if (map.direction === 'top-to-bottom') {
        for(let i = 0; i < map.word.length; i++) {
          this.grid[map.row + i][map.column] = map.word.substring(i, i + 1);
        }
      }
    }
    return this.grid;
  };
  
};
