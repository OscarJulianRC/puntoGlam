import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../tarjeta/tarjeta';
import { CatalogoService, Producto } from '../../services/catalogo.service';

@Component({
  selector: 'app-hombre',
  standalone: true,
  imports: [CommonModule, Tarjeta],
  templateUrl: './hombre.html',
  styleUrl: './hombre.css'
})
export class Hombre implements OnInit {
  productosHombre: Producto[] = [];

  constructor(private catalogoService: CatalogoService){}
  
  ngOnInit(): void {
      this.catalogoService.obtenerCatalogo().subscribe((catalogo) => {
        this.productosHombre = catalogo.filter(p => p.categoria.toLowerCase() === 'hombre' && p.price !== '$ ???');
      })
  }
}
