export class Constants {
  
  // Const declaration
  GRID_WIDTH: number = 20;
  GRID_HEIGHT: number = 20;
  DIRECTIONS: string[] = [
    'horizontal',
    'vertical',
    'diagonal'
  ]
   // hard coded, but should be changed for an API in the future.
  WORD_LIST: string[] = [
    'Ditto',
    'Arbok',
    'Eevee',
    'Entei',
    'Gloom',
    'Ekans',
    'Pichu',
    'Aipom',
    'Duduo',
    'Pikachu',
    'bubasaur',
    'Squirtle',
    'Charmander'
  ];


    constructor(values: Object = {}) {
      Object.assign(this, values);
    }

}
