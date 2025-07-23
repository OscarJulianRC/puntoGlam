import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.items = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.obtenerTotal();
  }

  formatearPrecio(valor: number): string {
    return '$ ' + valor.toLocaleString('es-CO');
  }

  eliminar(index: number): void {
    this.carritoService.eliminar(index);
    this.cargarCarrito();
  }

  comprarPorWhatsApp(): void {
    if (this.items.length === 0) {
      Swal.fire({ icon: 'error', title: 'Tu carrito está vacío.' });
      return;
    }

    let mensaje = 'Hola, quiero comprar las siguientes prendas:\n';
    this.items.forEach(item => {
      mensaje += `- ${item.nombre} - Precio: ${this.formatearPrecio(item.precioFinal)}\n - Ref: ${item.imagenFinal} \n\n`;
    });

    mensaje += `\nTotal: ${this.formatearPrecio(this.total)}`;

    const telefono = '573124363934';
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    this.carritoService.limpiarCarrito();
    this.cargarCarrito();

    Swal.fire({
      icon: 'success',
      title: '¡Gracias por tu compra!',
      text: 'Tu carrito ha sido vaciado con éxito.',
      confirmButtonText: 'Aceptar',
    }).then(result => {
      if (result.isConfirmed) {
        window.location.href = '/';
      }
    });
  }
}
