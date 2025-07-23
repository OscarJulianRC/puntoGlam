import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../tarjeta/tarjeta';
import { CatalogoService, Producto } from '../../services/catalogo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pijamas',
  standalone: true,
  imports: [CommonModule, Tarjeta, HttpClientModule],
  templateUrl: './pijamas.html',
  styleUrl: './pijamas.css'
})
export class Pijamas implements OnInit {
  productosPijamas: Producto[] = [];

  constructor(private catalogoService: CatalogoService){}
  
  ngOnInit(): void {
      this.catalogoService.obtenerCatalogo().subscribe((catalogo) => {
        this.productosPijamas = catalogo.filter(p => p.categoria.toLowerCase() === 'pijamas');
      })
  }
}
