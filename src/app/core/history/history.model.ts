import { Turn } from '../fight/fight.model';

export type GameResult = 'win' | 'loss';

export interface HistoryPokemon {
  pokedexId: number;
  name: string;
  sprite: string;
  isFainted: boolean;
}

export interface GameHistoryEntry {
  id: string;
  date: string;
  opponentName: string;
  result: GameResult;
  turnCount: number;
  analysis : analysis;
  playerTeam: HistoryPokemon[];
  opponentTeam: HistoryPokemon[];
  log: Turn[];
}

export interface analysis {
  score: number;
  scoreByTurn: Record<string, number>;
  advice: string;
}