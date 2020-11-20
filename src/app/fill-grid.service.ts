import { Injectable } from '@angular/core';
import { WORD_LIST, GRID_WIDTH, GRID_HEIGHT, DIRECTIONS, ALPHABET, GRID_SIZE } from './constants';
import { TileComponent } from './tile/tile.component';
import { ITile , IBoardGenerator, ILocation, IList  } from './grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class FillGridService implements IBoardGenerator {
  grid: ITile[][] = []
  
  alphabet: string = ALPHABET
  words: IList[] = WORD_LIST
  gridWidth: number = GRID_WIDTH
  gridHeight: number = GRID_HEIGHT
  gridSize: number = GRID_SIZE
  directions: string[] = DIRECTIONS
  
  wordCounter: number = 0

  constructor() { }
  
  generateBoard(gridSize: number, wordList: IList[]): ITile[][] {
    this.words = wordList;
    this.gridSize = gridSize;
    this.generateGrid();
    this.placeWord();
    this.fillEmptySpots();
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
        this.grid[i].push({letter:'_', isWord: false});
      }
    }
  }
  
  getWord(): IList {
    let sortedWords = this.words.sort( (a,b) => (b.word.length) - (a.word.length));
    let getOneWord = sortedWords[this.wordCounter];
    this.wordCounter++;
    return getOneWord;
  }

  // Find all available locations to place the word in every direction.
  getAvailableLocations(iWord: IList): ILocation[] {

    const locations: ILocation[] = [];
    const wordLength = iWord.word.length;
    let biggestOverlap = 0;

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
          let overlap = this.checkForOverlap(iWord, indexColumn, indexRow, nextTile);

          if(overlap >= biggestOverlap || overlap === 0) {
            biggestOverlap = overlap;
            locations.push({ indexColumn, indexRow, direction, overlap: biggestOverlap});
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
    return this.optimizeOverlaps(locations, biggestOverlap);
  };

  checkForOverlap( iWord, indexColumn, indexRow, getNextTile ): number {
    let overlap: number = 0;

    for(let k = 0; k < iWord.word.length; k++) {
      let nextTile = getNextTile( indexColumn, indexRow, k );
      let tile = this.grid[nextTile.indexRow][nextTile.indexColumn];

      if (tile.letter === iWord.word[k]) {
        overlap++;
      }  else if (tile.letter !== '_') {
        return -1;
      }
    }
    return overlap;
  }

  optimizeOverlaps( locations, biggestOverlap ): ILocation[] {
    let overlapLocations: ILocation[] = []
    for(let [i ,location] of locations.entries()){
      if (location.overlap >= biggestOverlap) {
        overlapLocations.push(location);
      }
    }
    return overlapLocations;
  }

  placeWord(): ITile[][] {
    let length = this.words.length;
    while(length) {
      
      const iWord: IList = this.getWord();
      
      const locations = this.getAvailableLocations(iWord);
      
      const randomLocation: ILocation = locations[Math.floor(Math.random() * locations.length)];
      
      this.placeWordInGrid( iWord, randomLocation);

      length--;
    }
    return this.grid;
  }
  
  placeWordInGrid( iWord: IList, randomLocation: ILocation ): void {
    for (let i = 0, length = iWord.word.length; i < length; i++) {
      let next = this.nextTile[randomLocation.direction];
      next = next(randomLocation.indexColumn, randomLocation.indexRow, i);
      let tile = this.buildTile(iWord, next, i);
      this.grid[next.indexRow][next.indexColumn] = tile;
    }
    
  };

  buildTile(iWord, next, i): ITile {
    let tile: ITile = {
      letter: iWord.word[i],
      indexRow: next.indexRow,
      indexColumn: next.indexColumn,
      isWord: true, 
      isSelected: false
    };

    if ( this.grid[next.indexRow][next.indexColumn].letter === iWord.word[i] ) {
      let previousLetterPosition = this.grid[next.indexRow][next.indexColumn].letterPosition;
      tile.letterPosition = [previousLetterPosition, i];
    } else {
      tile.letterPosition = i;
    }
    return tile;
  }
  
  fillEmptySpots(): void {
    for(let row of this.grid) {
      let i:number = 0;
      while(i < this.gridWidth) {
        if(row[i].letter === "_") {
          row[i].letter = this.pickRandomLetter();
        }
        i++
      }
    }
  };

  pickRandomLetter(): string {
    const letterIndex = Math.floor(Math.random() * this.alphabet.length);
    const randomLetter = this.alphabet[letterIndex];
    return randomLetter;
  }
};

// Implement check to exclude words that don't fit in the grid.