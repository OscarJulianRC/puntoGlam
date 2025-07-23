import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css',
  imports: [CommonModule]
})
export class Tarjeta {
  @Input() product!: {
    id: string;
    name: string;
    price: string;
    categoria: string;
    image?: string;
    images?: string[];
  };

  constructor(private carritoService: CarritoService) {}

  currentImgIndex: number = 0;

  get images(): string[] {
    if (Array.isArray(this.product.images)) return this.product.images;
    if (this.product.image) return [this.product.image];
    return [];
  }

  cambiarImagen(direccion: 'prev' | 'next'): void {
    const len = this.images.length;
    if (direccion === 'prev') {
      this.currentImgIndex = (this.currentImgIndex - 1 + len) % len;
    } else {
      this.currentImgIndex = (this.currentImgIndex + 1) % len;
    }
  }

  precio(): boolean{
    return this.product.price === '$ ???';
  }

  agregarAlCarrito() {
    console.log('Producto agregado al carrito:', this.product.name);
    this.carritoService.agregar(this.product.name, this.images[this.currentImgIndex], this.product.price);

    Swal.fire({
      icon: 'success',
      title: `${this.product.name} agregado al carrito`,
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
    
  }

  imagenFallback(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = `https://placehold.co/400x500/CCCCCC/000000?text=${this.product.name.replace(/\s/g, '+')}`;
  }
}
