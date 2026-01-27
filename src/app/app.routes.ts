import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Pokedex} from './pages/pokedex/pokedex';
import {Fight} from './pages/fight/fight';
import {Equipes} from './pages/equipes/equipes';
import {Pokemon} from './pages/pokemon/pokemon';

export const routes: Routes = [
  { path: '', component : Home},
  { path: 'pokedex', component : Pokedex },
  { path: 'equipes', component : Equipes },
  { path: 'pokemon/:id', component : Pokemon },
  { path: 'fight', component : Fight }
];
