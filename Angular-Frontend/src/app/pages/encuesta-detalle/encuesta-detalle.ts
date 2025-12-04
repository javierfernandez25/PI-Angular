import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-encuesta-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './encuesta-detalle.html',
  styleUrl: './encuesta-detalle.scss'
})
export class EncuestaDetalleComponent implements OnInit {

  // Inyecciones de dependencias
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef); // 🛠️ Herramienta para forzar la actualización visual

  // Variables de datos
  encuesta: any = null;
  preguntas: any[] = [];
  cargando: boolean = true;

  ngOnInit() {
    // 1. Obtenemos el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    console.log('👁️ Viendo detalles del ID:', id);

    if (id) {
      this.cargarDatosCompletos(id);
    }
  }

  cargarDatosCompletos(id: string) {
    this.cargando = true;

    this.apiService.getEncuestaPorId(id).subscribe({
      next: (data) => {
        console.log(' Encuesta recibida:', data);
        this.encuesta = data;
        
        this.cd.detectChanges();

        this.cargarPreguntas(id);
      },
      error: (err) => {
        console.error(' Error cargando encuesta:', err);
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  cargarPreguntas(idEncuesta: string) {
    console.log(' Pidiendo preguntas para:', idEncuesta);

    this.apiService.getPreguntas(idEncuesta).subscribe({
      next: (data: any) => {
        console.log(' Preguntas recibidas:', data);
        this.preguntas = data;
        this.cargando = false; // Fin de la carga
        
        //   Pinta la lista de preguntas
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(' Error cargando preguntas:', err);
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }
}