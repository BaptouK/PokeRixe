import {Component, Input, input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgForOf
  ],
  templateUrl: './card.html',
  styleUrl: './card.css',

})
export class Card {

  @Input() name: string = '';
  @Input() sprite: string = '';
  @Input() apiTypes: { name: string, image: string }[] = []; // Accepte les objets complets
}
