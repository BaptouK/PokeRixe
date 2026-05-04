import { Component, computed, effect, ElementRef, input, ViewChild } from '@angular/core';
import { Turn } from '../../../core/fight/fight.model';

@Component({
  selector: 'app-fight-log',
  imports: [],
  templateUrl: './fight-log.html',
  styleUrl: './fight-log.css',
})
export class FightLog {
  turns = input<Turn[]>([]);

  readonly hasActions = computed(() => this.turns().some(t => t.actions.length > 0));

  @ViewChild('logContainer') private logContainer!: ElementRef<HTMLElement>;

  private lastEventCount = 0;

  constructor() {
    effect(() => {
      const total = this.turns().reduce((acc, t) => acc + t.actions.length, 0);
      if (total > this.lastEventCount) {
        this.lastEventCount = total;
        setTimeout(() => {
          const el = this.logContainer?.nativeElement;
          if (el) el.scrollTop = el.scrollHeight;
        });
      }
    });
  }
}
