import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../tarjeta/tarjeta';
import { CatalogoService, Producto } from '../../services/catalogo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-unisex',
  standalone: true,
  imports: [CommonModule, Tarjeta, HttpClientModule],
  templateUrl: './unisex.html',
  styleUrl: './unisex.css'
})
export class Unisex implements OnInit {
  productosUnisex: Producto[] = [];

  constructor(private catalogoService: CatalogoService){}
  
  ngOnInit(): void {
      this.catalogoService.obtenerCatalogo().subscribe((catalogo) => {
        this.productosUnisex = catalogo.filter(p => p.categoria.toLowerCase() === 'unisex');
      })
  }
}
