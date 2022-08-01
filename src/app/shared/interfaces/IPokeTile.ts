export interface IPokeTile {
  letter: string;
  coordinates?: IPokeTileCoor;
  wordLength: number;
  letterIndex: number;
}

export interface IPokeTileCoor {
  x: number,
  y: number,
}

export interface IPokeTilePartial {
  letter: string;
}