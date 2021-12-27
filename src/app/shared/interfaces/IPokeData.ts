import { IPokeTile} from "./IPokeTile";

export interface IResponse {
  results: object[];
}

export interface IDataResponse {
  name?: string;
  url?: string;
}

export interface IPokeData {
  word: string,
  urlSvg: string,
  isFound: boolean,
  tiles?: IPokeTile[]
}

export interface IWordSoFar {
  word: string,
  coordinates: object[];
}
