import {Component, Input, input} from '@angular/core';
import { NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [
    RouterLink

  ],
  templateUrl: './card.html',
  styleUrl: './card.css',
})

export class Card {

  @Input() name: string = '';
  @Input() sprite: string = '';
  @Input() apiTypes: { name: string, image: string }[] = []; // Accepte les objets complets
}
