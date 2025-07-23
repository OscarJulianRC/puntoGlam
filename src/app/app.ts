import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule]
})
export class App {
  protected title = 'puntoGlam-Angular';


  constructor(public router: Router, private carritoService: CarritoService) { }

  isInicio(): boolean {
    return this.router.url === '/inicio' || this.router.url === '/';
  }

  isCarrito(): boolean {
    return this.router.url === '/carrito';
  }

  verCarrito(): boolean {
    return this.router.url === '/carrito' || this.isInicio();
  }

  scrollToContacto(event: Event) {
    event.preventDefault();

    const contacto = document.getElementById('contacto');
    if (contacto) {
      contacto.scrollIntoView({ behavior: 'smooth' });
    }
  }

  contador: number = 0;

  ngOnInit(): void {
    this.carritoService.contadorObservable.subscribe(
      (valor) => (this.contador = valor)
    );
  }

  whatsappNumber: string = '573124363934';

  abrirSoporte(): void {
    const mensaje = encodeURIComponent('Hola, necesito soporte con el catálogo de ropa.');
    window.open(`https://wa.me/${this.whatsappNumber}?text=${mensaje}`, '_blank');
  }

  currentYear: number = new Date().getFullYear();
}
