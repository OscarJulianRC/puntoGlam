import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../tarjeta/tarjeta';
import { CatalogoService, Producto } from '../../services/catalogo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mujer',
  standalone: true,
  imports: [CommonModule, Tarjeta, HttpClientModule],
  templateUrl: './mujer.html',
  styleUrl: './mujer.css'
})
export class Mujer implements OnInit {
  productosMujer: Producto[] = [];

  constructor(private catalogoService: CatalogoService){}
  
  ngOnInit(): void {
      this.catalogoService.obtenerCatalogo().subscribe((catalogo) => {
        this.productosMujer = catalogo.filter(p => p.categoria.toLowerCase() === 'mujer' && p.price !== '$ ???');
      })
  }
}
