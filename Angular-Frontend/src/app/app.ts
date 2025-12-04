import { Component } from '@angular/core';
// 👇 IMPORTANTE: Importar estas dos cosas
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // La clase se queda vacía, solo sirve de marco
}