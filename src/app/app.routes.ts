import { Routes } from '@angular/router';
import { Hombre } from './pages/hombre/hombre';
import { Mujer } from './pages/mujer/mujer';
import { Ninos } from './pages/ninos/ninos';
import { Pijamas } from './pages/pijamas/pijamas';
import { Unisex } from './pages/unisex/unisex';
import { Carrito } from './pages/carrito/carrito';


export const routes: Routes = [
    {path: 'hombre', component: Hombre},
    {path: 'mujer', component: Mujer},
    {path: 'ninos', component: Ninos},
    {path: 'pijamas', component: Pijamas},
    {path: 'unisex', component: Unisex},
    {path: 'carrito', component: Carrito},
];
