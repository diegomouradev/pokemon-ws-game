import { IList } from './grid/grid.model';

// Const declaration
export const GRID_WIDTH: number = 20;
export const GRID_HEIGHT: number = 20;
export const GRID_SIZE: number = 20;
export const DIRECTIONS: string[] = [
  'horizontal',
  'vertical',
  'diagonal'
]
export const WORD_LIST: IList[] = [
  {word:'Ditto', completed:false},
  {word:'Arbok', completed:false},
  {word:'Eevee', completed:false},
  {word:'Entei', completed:false},
  {word:'Gloom', completed:false},
  {word:'Ekans', completed:false},
  {word:'Pichu', completed:false},
  {word:'Aipom', completed:false},
  {word:'Duduo', completed:false},
  {word:'Pikachu', completed:false},
  {word:'Bulbasaur', completed:false},
  {word:'Squirtle', completed:false},
  {word:'Charmander', completed:false},
  {word:'Charizard', completed:false},
  {word:'Mug', completed:false},
  {word:'Miltang', completed:false},
  {word:'Snorlax', completed:false},
  {word:'Gyarados', completed:false},
  {word:'Blastoise', completed:false}
];
export const ALPHABET: string = 'abcdefghijklmnoprstuvwy'


