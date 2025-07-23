import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  name: string;
  price: string;
  categoria: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  obtenerCatalogo(): Observable<Producto[]> {
    return this.http.get<Producto[]>('/assets/catalogo.json'); // ajusta si tu JSON vive en otra ruta
  }
}
