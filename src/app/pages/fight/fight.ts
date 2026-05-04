import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Move } from '../../shared/components/move/move';
import { FightLog } from '../../shared/components/fight-log/fight-log';
import { FightPokemonCard } from '../../shared/components/fight-pokemon-card/fight-pokemon-card';
import { HpBar } from '../../shared/components/hp-bar/hp-bar';
import { FightWsService } from '../../core/fight/fight-ws.service';
import { TeamService } from '../../core/team/team.service';
import { TeamMove } from '../../core/team/team.model';
import { OpponentPokemonState } from '../../core/fight/fight.model';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-fight',
  imports: [Move, FightLog, FightPokemonCard, HpBar],
  templateUrl: './fight.html',
  styleUrl: './fight.css',
})
export class Fight implements OnDestroy {

  private readonly authService = inject(AuthService);
  private readonly fightWsService = inject(FightWsService);
  private readonly teamService = inject(TeamService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly gameId = Number(this.route.snapshot.paramMap.get('gameId'));

  /** Signaux exposés au template  */
  readonly phase = this.fightWsService.phase;
  readonly playerActive = this.fightWsService.playerActivePokemon;
  readonly opponentActive = this.fightWsService.opponentActivePokemon;
  readonly playerTeam = this.fightWsService.playerTeam;
  readonly opponentName = this.fightWsService.opponentName;
  readonly playerName = this.fightWsService.playerName;
  readonly playerHasActed = this.fightWsService.playerHasActed;
  readonly mustSwitch = this.fightWsService.mustSwitch;
  readonly log = this.fightWsService.log;
  readonly winner = this.fightWsService.winner;
  readonly isFinished = this.fightWsService.isFinished;
  readonly error = this.fightWsService.error;
  readonly connectionStatus = this.fightWsService.connectionStatus;
  readonly isPendingAction = this.fightWsService.isPendingAction;
  readonly playerActiveIndex = this.fightWsService.playerActiveIndex;

  private redirectTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Tracking des Pokémon adverses vus */
  readonly seenOpponents = signal<OpponentPokemonState[]>([]);

  readonly opponentTotalCount = computed(() => {
    const remaining = this.fightWsService.opponentRemainingCount();
    const faintedSeen = this.seenOpponents().filter((p) => p.currentHp === 0).length;
    return remaining + faintedSeen;
  });

  readonly unseenOpponentCount = computed(() => {
    return Math.max(0, this.opponentTotalCount() - this.seenOpponents().length);
  });

  constructor() {
    if (!this.fightWsService.isConnected()) {
      const user = this.authService.currentUser();

      if (!user) return;

      this.fightWsService.connect(user.id);
    }

    effect(() => {
      const active = this.opponentActive();
      if (!active) return;
      this.seenOpponents.update((seen) => {
        const existing = seen.findIndex((p) => p.name === active.name);
        if (existing >= 0) {
          const updated = [...seen];
          updated[existing] = active;
          return updated;
        }
        return [...seen, active];
      });
    });

    effect(() => {
      if (this.isFinished()) {
        this.redirectTimeout = setTimeout(() => this.router.navigate(['/history']), 10000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
    if (this.isFinished()) {
      this.fightWsService.reset();
    }
  }

  /** Signaux calculés */
  readonly activePlayerMoves = computed<TeamMove[]>(() => {
    return this.teamService.slots()[this.playerActiveIndex()]?.moves ?? [];
  });

  readonly canAct = computed(
    () => !this.playerHasActed() && this.phase() === 'waiting_actions' && !this.isPendingAction() && !this.mustSwitch(),
  );

  /** Actions */
  retryConnect(): void {
    // this.fightWsService.connect();
  }

  onMoveClick(move: TeamMove): void {
    if (!this.canAct()) return;
    this.fightWsService.sendAttack(move.slot, this.playerActiveIndex());
  }

  onPokemonSwitch(index: number): void {
    if (this.isPendingAction()) return;
    const target = this.playerTeam()[index];
    if (!target || target.currentHp === 0) return;
    if (index === this.playerActiveIndex()) return;
    if (!this.mustSwitch() && !this.canAct()) return;
    this.fightWsService.sendSwitch(index);
  }
}
