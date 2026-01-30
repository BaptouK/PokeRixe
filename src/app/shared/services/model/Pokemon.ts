export interface Pokemon{
  id: number;
  images: string;
  sprite: string;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };

}
