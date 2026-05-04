/**
 * Etat d'un Pokémon au sein du combat, visible par les deux joueurs.
 * Ne contient pas les attaques (confidentialité côté adversaire).
 */
export interface FightPokemonState {
  slotIndex: number;
  pokedexId: number;
  name: string;
  sprite: string;
  spriteBack: string;
  types: string[];
  hp: number;
  hpMax: number;
  isFainted: boolean;
}

/**
 * Phase courante du combat.
 * - `waiting_actions` : les deux joueurs doivent choisir une action
 * - `waiting_switch` : un joueur dont le Pokémon actif est K.O. doit choisir un remplaçant
 * - `finished` : le combat est terminé
 */
export type FightPhase = 'waiting_actions' | 'waiting_switch' | 'finished';

/**
 * Représente le point de vue du joueur courant.
 */
export interface FightState {
  gameId: string;
  turnNumber: number;
  FightPhase: FightPhase;
  player: CurrentPlayer;
  opponent: OpponentPlayer;
  playerHasActed: boolean;
  mustSwitch: boolean;
  turns: Turn[];
  winner: string;
}

export interface CurrentPlayer {
  pseudo: string;
  indexActivePokemon: number;
  pokemons: CurrentPokemonState[];
}

export interface OpponentPlayer {
  pseudo: string;
  indexActivePokemon: number;
  pokemons: OpponentPokemonState[];
}

export interface CurrentPokemonState {
  name: string;
  currentHp: number;
  maxHp: number;
  urlImageFront: string;
  urlImageBack: string;
  attacks: AttackState[];
}

export interface OpponentPokemonState {
  name: string;
  currentHp: number;
  maxHp: number;
  urlImageFront: string;
}

export interface AttackState {
  name: string;
  power: number | null;
  accuracy: number | null;
  type: string;
}


/** Type d'un événement dans le journal de combat. */
export type ActionType = 'turn_start' | 'attack' | 'damage' | 'faint' | 'switch' | 'fight_end';

/**
 * Événement individuel dans le journal de combat.
 */
export interface Turn {
  actions : Action[];
}

export interface Action {
  actionType : String;
  actionDescription : string;
}
