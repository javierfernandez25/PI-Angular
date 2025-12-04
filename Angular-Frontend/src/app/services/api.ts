import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private http = inject(HttpClient);
private apiUrl = 'http://localhost:3000/api';
  constructor() { }

  // 1. LISTAR ENCUESTAS
  getDatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas`);
  }

  // 2. CREAR ENCUESTA
  crearEncuesta(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas`, datos);
  }

  // 3. OBTENER UNA ENCUESTA POR ID
  getEncuestaPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas/${id}`);
  }

  // 4. ACTUALIZAR ENCUESTA
  actualizarEncuesta(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/encuestas/${id}`, datos);
  }

  // 5. BORRAR ENCUESTA
  borrarEncuesta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/encuestas/${id}`);
  }

  // 6. OBTENER PREGUNTAS (FILTRADAS POR ID ENCUESTA)
  getPreguntas(idEncuesta: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/preguntas?id_encuesta=${idEncuesta}`);
  }
}