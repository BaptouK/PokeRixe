  import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
  import {Card} from '../../shared/components/card/card';

  @Component({
    selector: 'app-pokedex',
    imports: [

    ],
    templateUrl: './pokedex.html',
    styleUrl: './pokedex.css',
  })
  export class Pokedex {

    @ViewChild('pokemonContainer', { read: ViewContainerRef })
    pokemonContainer!: ViewContainerRef;

    async ngAfterViewInit() { // Utilise ngAfterViewInit pour accéder à @ViewChild
      const response: any = await fetch('https://pokebuildapi.fr/api/v1/pokemon/generation/1')
        .then(res => res.json());

      for (const pokemon of response) {
        this.addPokemonCard(pokemon);
      }
    }

    addPokemonCard(pokemon: { image: string, name: string, apiTypes: { name: string }[] } ) {
      // Crée dynamiquement le composant Card

      //console.log(pokemon);
      const cardRef: ComponentRef<Card> = this.pokemonContainer.createComponent(Card);

      for (const types of pokemon.apiTypes) {
        cardRef.setInput('apiTypes', pokemon.apiTypes || []);
      }

      // Passe les données au composant
      cardRef.instance.name = pokemon.name;
      cardRef.instance.sprite = pokemon.image;
    }

  }

  /*
   {
  "id": 143,
  "pokedexId": 143,
  "name": "Ronflex",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
  "slug": "Ronflex",
  "stats": {
    "HP": 160,
    "attack": 110,
    "defense": 65,
    "special_attack": 65,
    "special_defense": 110,
    "speed": 30
  },
  "apiTypes": [
    {
      "name": "Normal",
      "image": "https://static.wikia.nocookie.net/pokemongo/images/f/fb/Normal.png"
    }
  ],
  "apiGeneration": 1,
  "apiResistances": [
    {
      "name": "Normal",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Combat",
      "damage_multiplier": 2,
      "damage_relation": "vulnerable"
    },
    {
      "name": "Vol",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Poison",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Sol",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Roche",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Insecte",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Spectre",
      "damage_multiplier": 0,
      "damage_relation": "immune"
    },
    {
      "name": "Acier",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Feu",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Eau",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Plante",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Électrik",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Psy",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Glace",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Dragon",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Ténèbres",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    },
    {
      "name": "Fée",
      "damage_multiplier": 1,
      "damage_relation": "neutral"
    }
  ],
  "resistanceModifyingAbilitiesForApi": {
    "name": "Isograisse",
    "slug": "Isograisse"
  },
  "apiEvolutions": [],
  "apiPreEvolution": {
    "name": "Goinfrex",
    "pokedexIdd": 446
  },
  "apiResistancesWithAbilities": []
}
   */
