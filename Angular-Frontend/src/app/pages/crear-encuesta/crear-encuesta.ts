import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-encuesta.html',
  styleUrl: './crear-encuesta.scss'
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;

  constructor(private fb: FormBuilder) {
  this.encuestaForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''], // <-- ESTO ELIMINA EL ERROR ROJO
    tiempoLimite: [0],
    preguntas: this.fb.array([])
  });
}

  get preguntasArray(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  // Crea una pregunta con todos los campos de tu HTML
  crearPregunta(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required],
      obligatoria: [false],
      limite: ['250']
    });
  }

  addPregunta(): void {
    this.preguntasArray.push(this.crearPregunta());
  }

  removePregunta(index: number): void {
    this.preguntasArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.encuestaForm.valid) {
      console.log('Datos listos para enviar:', this.encuestaForm.value);
    }
  }
}
