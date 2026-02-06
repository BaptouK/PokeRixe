import {PokeStats} from './pokeStats';
import {pokeType} from './pokeType';

export class Pokemon{
  id: number | undefined;
  images: string | undefined;
  sprite: string | undefined;
  name: string | undefined;
  height: number | undefined;
  weight: number | undefined;
  types: pokeType[] | undefined;
  abilities: string[] | undefined;
  stats: PokeStats | undefined;
}
