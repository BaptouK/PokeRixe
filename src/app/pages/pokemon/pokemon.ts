import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon {

  constructor(private route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const response: any = await fetch('https://pokebuildapi.fr/api/v1/pokemon/'+ id).then(res => res.json());



  }
}
