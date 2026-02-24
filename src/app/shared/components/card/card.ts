import {Component, Input, input} from '@angular/core';
import { NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Type} from '../type/type';

@Component({
  selector: 'app-card',
  imports: [
    RouterLink,
    Type

  ],
  templateUrl: './card.html',
  styleUrl: './card.css',
})

export class Card {

  @Input() name: string = '';
  @Input() pokedex_id: string = '';
  @Input() sprite: string = '';
  @Input() apiTypes: { name: string, image: string }[] = []; // Accepte les objets complets
}
