import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-crear-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-encuesta.html',
  styleUrl: './crear-encuesta.scss'
})
export class CrearEncuestaComponent implements OnInit {

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Definición del formulario
  encuestaForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    preguntas: this.fb.array([])
  });

  isEditMode = false;
  encuestaId: string | null = null;

  // Getter para acceder fácil al array de preguntas en el HTML
  get preguntasArray() {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  ngOnInit() {
    // Comprobamos si hay un ID en la URL
    this.encuestaId = this.route.snapshot.paramMap.get('id');

    if (this.encuestaId) {
      this.isEditMode = true;

      // Check for resolved data
      const dataEncuesta = this.route.snapshot.data['encuesta'];
      const dataPreguntas = this.route.snapshot.data['preguntas']; // preguntasResolver returns array

      if (dataEncuesta) {
        this.encuestaForm.patchValue({
          titulo: dataEncuesta.titulo,
          descripcion: dataEncuesta.descripcion
        });
      }

      if (dataPreguntas) {
        const preguntas = Array.isArray(dataPreguntas) ? dataPreguntas : [];
        this.preguntasArray.clear();
        preguntas.forEach((p: any) => { // Added type annotation
          const preguntaGroup = this.fb.group({
            texto_pregunta: [p.texto_pregunta, Validators.required]
          });
          this.preguntasArray.push(preguntaGroup);
        });
      }
    }
  }

  // Cargar datos del servidor al formulario (Legacy / fallback, kept just in case but unused if resolver works)
  cargarDatosParaEditar(id: string) {
    // Logic replaced by resolver consumption in ngOnInit
  }

  // Añadir una pregunta vacía al formulario
  addPregunta() {
    const preguntaGroup = this.fb.group({
      texto_pregunta: ['', Validators.required]
    });
    this.preguntasArray.push(preguntaGroup);
  }

  // Eliminar una pregunta del formulario
  removePregunta(index: number) {
    this.preguntasArray.removeAt(index);
  }

  // Enviar datos al servidor
  onSubmit() {
    if (this.encuestaForm.invalid) {
      this.encuestaForm.markAllAsTouched();
      return;
    }

    const datos = this.encuestaForm.value;

    if (this.isEditMode && this.encuestaId) {
      this.apiService.actualizarEncuesta(this.encuestaId, datos).subscribe({
        next: () => {
          alert(' Encuesta actualizada correctamente');
          this.irAlInicioConRetraso();
        },
        error: (err) => console.error(err)
      });

    } else {
      this.apiService.crearEncuesta(datos).subscribe({
        next: () => {
          alert(' Encuesta creada correctamente');
          this.irAlInicioConRetraso();
        },
        error: (err) => console.error(err)
      });
    }
  }


  irAlInicioConRetraso() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }
}