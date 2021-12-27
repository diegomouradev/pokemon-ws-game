import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of, Subscription } from 'rxjs';
import { Ilocation } from 'src/app/shared/interfaces/ilocation';
import { IPokeData } from 'src/app/shared/interfaces/IPokeData';

import { IPokeTile } from 'src/app/shared/interfaces/IPokeTile';
import { GameDataService } from 'src/app/shared/services/game-data.service';

@Injectable()
export class GenerateNewGameBoardService {
  errorMessage;

  GAME_BOARD_SIZE = 20;
  ALPHABET: string = 'abcdefghijklmnoprstuvwyz';
  DIRECTIONS: string[] = [
    'horizontal',
    'horizontalBack',
    'vertical',
    'verticalUp',
    'diagonal',
    'diagonalBack',
    'diagonalUp',
    'diagonalUpBack',
  ];

  constructor(private gameDataService: GameDataService) {}

  public gameBoard: IPokeTile[][] = [];
  private pokeList: IPokeData[] = [];
  public pokeData$: Observable<IPokeData[]>;
  private pokeWord: IPokeData[];
  

  buildGameBoard(pokeData): IPokeTile[][] {
    this.pokeWord = pokeData;
    this.pokeWord.sort((a, b) => b.word.length - a.word.length);
    this.generateGameBoard();
    this.placeWord();
    this.fillEmptySpots()
    this.pokeData$ = of(this.pokeList);
    return this.gameBoard
  }

  generateGameBoard(): void {
    for (let i = 0; i < this.GAME_BOARD_SIZE; i++) {
      this.gameBoard.push([]);
      for (let j = 0; j < this.GAME_BOARD_SIZE; j++) {
        this.gameBoard[i].push({letter: '_', coordinates: {x: 0,y: 0}});
      }
    }
  }

  placeWord(): void {
    let length = this.pokeWord.length;
    while (length) {
      let pokemon = this.getWord();
      let locations = this.generatePossibleLocations(pokemon.word);
      if (locations.length > 0) {

        let location = locations[Math.floor(Math.random() * locations.length)];
        this.placeWordInGrid(pokemon.word, location);
        this.pokeList.push(pokemon);
      }
      length--;
      
    }
  }

  getWord(): IPokeData {
    const pokeWord =  this.pokeWord.splice(0, 1);
    return pokeWord[0];
  }

  // Given a word.
  generatePossibleLocations(word): Ilocation[] {
    let availableLocations: Ilocation[] = [];
    // For each direction, and one at a time.
    for(let direction of this.DIRECTIONS) {
      // Visit every column of every row of the gameBoard, and check
      // if the word would fit if we were to start placing it from there.

      // Start at row 0 column 0.
      let x,y;
      x = 0; // Column
      y = 0; // Row

      // While there are rows to check.
      while(y < this.GAME_BOARD_SIZE) {
        // check if the direction is valid.
        if(this.isDirectionValid[direction](this.GAME_BOARD_SIZE, x, y, word.length)) {

          // ------ If the direction is valid build a location meta-data object
          // and push it to the availableLocations array
          // ad move to the next column in the same row.
          // availableLocations.push({ x, y, direction }); ------ DEAD

          // If the direction is valid check if there is any other
          // word overlapping with the current word we are trying to place.
          let overlap = this.checkForOverlap(word, x, y, direction);

          if(overlap >= 0) {
            availableLocations.push({ x, y, direction });
          } 

          // Move to the next columns.
          x++;
          if( x >= this.GAME_BOARD_SIZE) {
            x = 0; 
            y++;
          }
        } else {
          // If for the current x|y pair and direction
          // the word won't fit. Use skipTile to go
          // to the next available location, and avoid
          // checking unecessary tiles.
          let next = this.skipTiles[direction](x, y, word.length);
          
          // Set the new coordinates to the response
          // of SkipTiles.
          x = next.x;
          y = next.y 
        }
       
      }
    }
     return availableLocations;
  }

  checkForOverlap(word: string, x, y, direction): number {
    // The current tile is represented by the x|y
    // and for our word to fit in this given direction,
    // we need to check all the tiles needed for our word. 
    
    // Visit every tile needed by iterating through our wordLength value.
    // Use the nexTile method to directly check the gameBoard state.
    let overlap = 0;
    for(let [index, letter] of Object.entries(word)) {
     
      const nextTile = this.getNextTile[direction](x, y, Number(index));
      const tile = this.gameBoard[nextTile.y][nextTile.x]

      // Increment the overlap counter 
      if(tile.letter === letter) {
        overlap++
      
        // Return if no overlap is possible.
      } else if(tile.letter !== '_') {
        return -1;
      }
    }
   return overlap;
  //   TODO: Optimize Overlap
  }

  placeWordInGrid(word, randomLocation: Ilocation) {
    for (let i = 0, length = word.length; i < length; i++) {
      let next = this.getNextTile[randomLocation.direction];
      next = next(randomLocation.x, randomLocation.y, i);
      let tile = this.buildTile(word, next, i);
      this.gameBoard[next.y][next.x] = tile;
    }
  }

  buildTile(word, next, i): IPokeTile {
    let tile: IPokeTile = {
      letter: word[i],
      coordinates: { x: next.x, y: next.y},
    };
    return tile;
  }

  fillEmptySpots(): void {
    for (let row of this.gameBoard) {
      let i: number = 0;
      while (i < this.GAME_BOARD_SIZE) {
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

  getNextTile = {
    horizontal: (x: number, y: number, i: number) => ({
      x: x + i,
      y: y,
    }),
    horizontalBack: (x: number, y: number, i: number) => ({
      x: x - i,
      y,
    }),
    vertical: (x: number, y: number, i: number) => ({
      x,
      y: y + i,
    }),
    verticalUp: (x: number, y: number, i: number) => ({
      x,
      y: y - i,
    }),
    diagonal: (x: number, y: number, i: number) => ({
      x: x + i,
      y: y + i,
    }),
    diagonalBack: (x: number, y: number, i: number) => ({
      x: x - i,
      y: y + i,
    }),
    diagonalUp: (x: number, y: number, i: number) => ({
      x: x + i,
      y: y - i,
    }),
    diagonalUpBack: (x: number, y: number, i: number) => ({
      x: x - i,
      y: y - i,
    }),
  };

  isDirectionValid = {
    horizontal: (gameBoardSize, x, y, wordLength) =>
      gameBoardSize >= x + wordLength,
    horizontalBack: (gameBoardSize, x, y, wordLength) => x + 1 >= wordLength,
    vertical: (gameBoardSize, x, y, wordLength) =>
      gameBoardSize >= y + wordLength,
    verticalUp: (gameBoardSize, x, y, wordLength) => y + 1 >= wordLength,
    diagonal: (gameBoardSize, x, y, wordLength) =>
      gameBoardSize >= x + wordLength && gameBoardSize >= y + wordLength,
    diagonalBack: (gameBoardSize, x, y, wordLength) =>
      x + 1 >= wordLength && gameBoardSize >= y + wordLength,
    diagonalUp: (gameBoardSize, x, y, wordLength) =>
      gameBoardSize >= x + wordLength && y + 1 >= wordLength,
    diagonalUpBack: (gameBoardSize, x, y, wordLength) =>
      x + 1 >= wordLength && y + 1 >= wordLength,
  };

  skipTiles = {
    horizontal: (x, y, wordLength) => ({
      x: 0,
      y: y + 1,
    }),
    horizontalBack: (x, y, wordLength) => ({
      x: wordLength - 1,
      y: y,
    }),
    vertical: (x, y, wordLength) => ({
      x: 0,
      y: y + 100,
    }),
    verticalUp: (x, y, wordLength) => ({
      x: 0,
      y: wordLength - 1,
    }),
    diagonal: (x, y, wordLength) => ({
      x: 0,
      y: y + 1,
    }),
    diagonalBack: (x, y, wordLength) => ({
      x: wordLength - 1,
      y: x >= wordLength - 1 ? y + 1 : y,
    }),
    diagonalUp: (x, y, wordLength) => ({
      x: 0,
      y: y < wordLength - 1 ? wordLength - 1 : y + 1,
    }),
    diagonalUpBack: (x, y, wordLength) => ({
      x: wordLength - 1,
      y: x >= wordLength - 1 ? y + 1 : y,
    }),
  };

  
}
