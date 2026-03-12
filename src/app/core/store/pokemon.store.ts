import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';

/**
 * Store pour gérer l'état des Pokémon dans l'application.
 * Sert a optimiser l'application avec un cache simple pour éviter les appels redondants.
 */
@Injectable({ providedIn: 'root' })
export class PokemonStore {
  private readonly pokemonService = inject(PokemonService);

  private readonly _pokemons = signal<Pokemon[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _lastFetch = signal<number | null>(null);

  pokemons = this._pokemons.asReadonly();

  /**
   * Durée de validité du cache en millisecondes (5 minutes).
   * @private
   */
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  private isCacheValid(): boolean {
    const last = this._lastFetch();
    return last !== null && (Date.now() - last) < this.CACHE_DURATION;
  }

  /**
   * Charge les 150 premiers Pokémon depuis l'API si le cache est invalide.
   * Met à jour les signaux de chargement et d'erreur en conséquence.
   * Si le cache est valide, ne fait rien pour éviter les appels redondants.
   */
  loadFirst150(): void {
    if (this.isCacheValid()) return;

    this._loading.set(true);
    this._error.set(null);

    this.pokemonService.getFirst150().subscribe({
      next: (pokemons) => {
        this._pokemons.set(pokemons);
        this._lastFetch.set(Date.now());
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
    });
  }

  /**
   * Récupère un Pokémon par son ID depuis le cache.
   * @param id id du Pokémon dans le Pokédex
   * @returns le Pokémon correspondant ou undefined si non trouvé
   */
  getById(id: number): Pokemon | undefined {
    return this._pokemons().find(p => p.id === id);
  }
}
