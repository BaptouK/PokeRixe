import { TestBed } from '@angular/core/testing';

import ApiPokemons from './api-pokemons';

describe('ApiPokemons', () => {
  let service: ApiPokemons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPokemons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
