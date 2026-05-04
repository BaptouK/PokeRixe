import { Signal } from '@angular/core';
import { CurrentPokemonState, FightPhase, OpponentPokemonState, Turn } from './fight.model';

export type ConnectionStatus = 'connecting' | 'waiting' | 'playing' | 'disconnected';

export abstract class FightWsService {
  abstract readonly phase: Signal<FightPhase | null>;
  abstract readonly playerActivePokemon: Signal<CurrentPokemonState | null>;
  abstract readonly opponentActivePokemon: Signal<OpponentPokemonState | null>;
  abstract readonly playerTeam: Signal<CurrentPokemonState[]>;
  abstract readonly playerHasActed: Signal<boolean>;
  abstract readonly mustSwitch: Signal<boolean>;
  abstract readonly log: Signal<Turn[]>;
  abstract readonly winner: Signal<string | null>;
  abstract readonly isFinished: Signal<boolean>;

  abstract readonly error: Signal<string | null>;
  abstract readonly connectionStatus: Signal<ConnectionStatus>;

  abstract readonly opponentName: Signal<string>;
  abstract readonly playerName: Signal<string>;
  abstract readonly opponentRemainingCount: Signal<number>;
  abstract readonly isPendingAction: Signal<boolean>;
  abstract readonly playerActiveIndex: Signal<number>;

  abstract connect(userId: string): void;
  abstract isConnected(): boolean;
  abstract sendAttack(moveSlot: number, pokemonSlot: number): void;
  abstract sendSwitch(slotIndex: number): void;
  abstract reset(): void;
}
