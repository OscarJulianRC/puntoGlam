import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../tarjeta/tarjeta';
import { CatalogoService, Producto } from '../../services/catalogo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ninos',
  standalone: true,
  imports: [CommonModule, Tarjeta, HttpClientModule],
  templateUrl: './ninos.html',
  styleUrl: './ninos.css'
})
export class Ninos implements OnInit {
  productosNinos: Producto[] = [];

  constructor(private catalogoService: CatalogoService){}
  
  ngOnInit(): void {
      this.catalogoService.obtenerCatalogo().subscribe((catalogo) => {
        this.productosNinos = catalogo.filter(p => p.categoria.toLowerCase() === 'ninos');
      })
  }
}
