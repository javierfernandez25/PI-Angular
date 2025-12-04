import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { ApiService } from '../../services/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef); // Herramienta para forzar actualización
  private router = inject(Router);

  listaDatos: any[] = [];

  constructor() {
    // Escuchamos si el usuario hace clic en "Inicio" estando ya en Inicio
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cargarEncuestas();
    });
  }

  ngOnInit() {
    // Carga inicial al entrar
    this.cargarEncuestas();
  }

  cargarEncuestas() {
    console.log(' Cargando lista de encuestas...');
    
    this.apiService.getDatos().subscribe({
      next: (data: any) => {
        console.log(' Datos recibidos:', data);
        
        this.listaDatos = [...data];
        
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(' Error cargando:', error);
      }
    });
  }

  borrarEncuesta(id: string) {
    if (confirm('¿Seguro que quieres borrar?')) {
      this.apiService.borrarEncuesta(id).subscribe(() => {
        this.cargarEncuestas();
      });
    }
  }
}