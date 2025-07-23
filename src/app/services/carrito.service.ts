import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  nombre: string;
  imagen: string;
  imagenFinal: string;
  precioFinal: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private carrito: ItemCarrito[] = [];

  private contador$ = new BehaviorSubject<number>(this.carrito.length);
  contadorObservable = this.contador$.asObservable();

  constructor() {
    const almacenado = localStorage.getItem('carrito');
    this.carrito = almacenado ? JSON.parse(almacenado) : [];
  }

  limpiarRuta(ruta: string): string {
    const index = ruta.indexOf('/Images/');
    return index !== -1 ? ruta.slice(index) : ruta;
  }

  agregar(nombre: string, imagen: string, precio: string): void {
    const precioFinal = parseInt(precio.replace(/\$|\s|\./g, ''));
    const imagenFinal = this.limpiarRuta(imagen);
    this.carrito.push({ nombre, imagen, imagenFinal, precioFinal });
    this.guardar();
  }

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    this.guardar();
  }

  obtenerCarrito(): ItemCarrito[] {
    return [...this.carrito];
  }

  obtenerTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precioFinal, 0);
  }

  limpiarCarrito(): void {
    this.carrito = [];
    localStorage.removeItem('carrito');
    this.contador$.next(0);
  }

  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.contador$.next(this.carrito.length);
  }
}
