import { Injectable } from '@angular/core';
import { IWordList, ITile, IBoardGenerator, ILocation } from './ws-game.models';

@Injectable({
  providedIn: 'root',
})
export class FillGridService implements IBoardGenerator {
  ALPHABET: string = 'abcdefghijklmnoprstuvwy';
  DIRECTIONS: string[] = [
    'horizontal',
    'horizontalReversed',
    'vertical',
    'verticalReversed',
    'diagonal',
    '',
    '',
    '',
  ];

  grid: ITile[][] = [];
  words: IWordList[];
  gridWidth: number;
  gridHeight: number;
  public displayList: IWordList[] = [];

  constructor() {}

  generateBoard(
    gridWidth: number,
    gridHeight: number,
    pokemonList: IWordList[]
  ): ITile[][] {
    this.words = pokemonList;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;

    this.generateGrid(gridWidth, gridHeight, this.grid);
    this.placeWord();
    this.fillEmptySpots();
    return this.grid;
  }

  // Given the direction calculates the next Square.
  nextTile: object = {
    horizontal: (indexColumn: number, indexRow: number, distance: number) => ({
      indexColumn: indexColumn + distance,
      indexRow,
    }),
    horizontalReversed: (
      indexColumn: number,
      indexRow: number,
      distance: number
    ) => ({ indexColumn: indexColumn - distance, indexRow }),
    vertical: (indexColumn: number, indexRow: number, distance: number) => ({
      indexColumn,
      indexRow: indexRow + distance,
    }),
    verticalReversed: (
      indexColumn: number,
      indexRow: number,
      distance: number
    ) => ({ indexColumn, indexRow: indexRow - distance }),
    diagonal: (indexColumn: number, indexRow: number, distance: number) => ({
      indexColumn: indexColumn + distance,
      indexRow: indexRow + distance,
    }),
  };

  // given the grid dimensions, and the tile position check if the word fits.
  isDirectionValid: object = {
    horizontal: (
      width: number,
      height: number,
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => width >= indexColumn + wordLength,
    horizontalReversed: (
      width: number,
      height: number,
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => indexColumn + 1 >= wordLength,
    vertical: (
      width: number,
      height: number,
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => height >= indexRow + wordLength,
    verticalReversed: (
      width: number,
      height: number,
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => indexRow + 1 >= wordLength,
    diagonal: (
      width: number,
      height: number,
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => width >= indexColumn + wordLength && height >= indexRow + wordLength,
  };

  // If the result of isDirectionValid returns false.
  skipTiles: object = {
    horizontal: (
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => ({ indexColumn: (indexColumn = 0), indexRow: indexRow + 1 }),
    horizontalReversed: (
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => ({ indexColumn: wordLength - 1, indexRow: indexRow }),
    vertical: (indexColumn: number, indexRow: number, wordLength: number) => ({
      indexColumn: (indexColumn = 0),
      indexRow: indexRow + 100,
    }),
    verticalReversed: (
      indexColumn: number,
      indexRow: number,
      wordLength: number
    ) => ({ indexColumn: (indexColumn = 0), indexRow: wordLength - 1 }),
    diagonal: (indexColumn: number, indexRow: number, wordLength: number) => ({
      indexColumn: (indexColumn = 0),
      indexRow: indexRow + 1,
    }),
  };

  // Generate grid of empty tiles.
  generateGrid(gridWidth, gridHeight, grid): ITile[][] {
    for (let i = 0; i < gridHeight; i++) {
      grid.push([]);
      for (let j = 0; j < gridWidth; j++) {
        grid[i].push({ letter: '_', isWord: false });
      }
    }
    return grid;
  }

  getWord(): IWordList {
    // let sortedWords = this.words.sort( (a,b) => (b.word.length) - (a.word.length));
    // let getOneWord = sortedWords[0];
    // sortedWords = sortedWords.splice(0,1)
    // return getOneWord;
    const randomWord = Math.floor(Math.random() * this.words.length);
    const word = this.words[randomWord];
    this.words.splice(randomWord, 1);
    return word;
  }

  // generateDisplayList(iWord) {
  //   this.displayList.push(iWord);
  // }

  // setDisplayList(displayList) {
  //   this.words.splice(displayList.length);
  // }

  // getDisplayList(): IWordList[] {
  //   return this.displayList;
  // }

  // Find all available locations to place the word in every direction.
  getAvailableLocations(iWord: IWordList): ILocation[] {
    const locations: ILocation[] = [];
    const wordLength = iWord.word.length;
    let biggestOverlap = 0;

    for (let j = 0; j < this.DIRECTIONS.length; j++) {
      const direction = this.DIRECTIONS[j];
      const checkDirection = this.isDirectionValid[direction];
      const nextTile = this.nextTile[direction];
      let indexColumn = 0;
      let indexRow = 0;

      while (indexRow < this.gridHeight) {
        // check if the word fits in the space available at all.
        if (
          checkDirection(
            this.gridWidth,
            this.gridHeight,
            indexColumn,
            indexRow,
            wordLength
          )
        ) {
          let overlap = this.checkForOverlap(
            iWord,
            indexColumn,
            indexRow,
            nextTile
          );

          if (overlap >= biggestOverlap || overlap === 0) {
            biggestOverlap = overlap;
            locations.push({
              indexColumn,
              indexRow,
              direction,
              overlap: biggestOverlap,
            });
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
  }

  checkForOverlap(iWord, indexColumn, indexRow, getNextTile): number {
    let overlap: number = 0;

    for (let k = 0; k < iWord.word.length; k++) {
      let nextTile = getNextTile(indexColumn, indexRow, k);
      let tile = this.grid[nextTile.indexRow][nextTile.indexColumn];

      if (tile.letter === iWord.word[k]) {
        overlap++;
      } else if (tile.letter !== '_') {
        return -1;
      }
    }
    return overlap;
  }

  optimizeOverlaps(locations, biggestOverlap): ILocation[] {
    let overlapLocations: ILocation[] = [];
    for (let [i, location] of locations.entries()) {
      if (location.overlap >= biggestOverlap) {
        overlapLocations.push(location);
      }
    }
    return overlapLocations;
  }

  placeWord(): ITile[][] {
    let length = this.words.length;

    while (length) {
      const iWord: IWordList = this.getWord();
      const locations = this.getAvailableLocations(iWord);

      if (locations.length > 0) {
        const randomLocation: ILocation =
          locations[Math.floor(Math.random() * locations.length)];
        this.placeWordInGrid(iWord, randomLocation);
        this.generateDisplayList(iWord);
      } else {
        // this.generateDisplayList(iWord); I HAVE IT WRONGLY PLACE HERE AS WELL
        return this.grid;
      }
      length--;
    }

    return this.grid;
  }

  placeWordInGrid(iWord: IWordList, randomLocation: ILocation): void {
    for (let i = 0, length = iWord.word.length; i < length; i++) {
      let next = this.nextTile[randomLocation.direction];
      next = next(randomLocation.indexColumn, randomLocation.indexRow, i);
      let tile = this.buildTile(iWord, next, i, randomLocation);
      this.grid[next.indexRow][next.indexColumn] = tile;
    }
  }

  buildTile(iWord, next, i, randomLocation): ITile {
    let tile: ITile = {
      letter: iWord.word[i],
      letterIndex: i === iWord.word.length - 1 ? 'wordEnd' : i,
      indexRow: next.indexRow,
      indexColumn: next.indexColumn,
      direction: randomLocation.direction,
      isWord: true,
    };
    return tile;
  }

  fillEmptySpots(): void {
    for (let row of this.grid) {
      let i: number = 0;
      while (i < this.gridWidth) {
        if (row[i].letter === '_') {
          row[i].letter = this.pickRandomLetter();
        }
        i++;
      }
    }
  }

  pickRandomLetter(): string {
    const letterIndex = Math.floor(Math.random() * this.ALPHABET.length);
    const randomLetter = this.ALPHABET[letterIndex];
    return randomLetter;
  }
}

// Implement check to exclude words that don't fit in the grid.
