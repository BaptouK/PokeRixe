import { Component } from '@angular/core';
import {Card} from '../../shared/components/card/card';

@Component({
  selector: 'app-pokedex',
  imports: [
    Card
  ],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css',
})
export class Pokedex {

  async ngOnInit() {
    const response: any = await fetch('https://pokebuildapi.fr/api/v1/pokemon/generation/1').then(res => res.json());
    console.log(response);

  }


}
