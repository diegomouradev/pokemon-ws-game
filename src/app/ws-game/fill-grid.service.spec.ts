import { TestBed } from '@angular/core/testing';

import { FillGridService } from './fill-grid.service';
import { GRID_HEIGHT, GRID_SIZE, GRID_WIDTH } from 'src/app/constants';
import { IList, ITile } from 'src/app/ws-game/grid/grid.model'

describe('FillGridService', () => {
  let service: FillGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate an empty grid of ITiles', () => {
    let grid: ITile[] = []
    let gridResult = service.generateGrid(10,10,grid);

    expect(gridResult.length).toBe(10);
  });
  
  it('should generate a word filled grid of ITiles', () => {
    fail();
  })

  it('should have a method for picking words, starting by the longest', () => {
    let words: IList[] = [
      {word: 'testWord', completed: false},
      {word: 'testWordLargerSize', completed: false}
    ];
    let wordCounter: number = 0;

    let wordResult = service.getWord(words, wordCounter);

    expect(wordResult).toBe({word: 'testWordLargerSize', completed: false});

  });

});
