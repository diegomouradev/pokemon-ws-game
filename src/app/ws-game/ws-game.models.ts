// Array of objects containing pokemon names and URL for complete data.
export interface IPokemonData {
  count: number;
  next: string;
  previous: null;
  results: object[];
}

// Shared with grid.component and list.component
export interface IWordList {
  word: string;
  id?: string;
  isCompleted: boolean;
}
