import { Routes } from '@angular/router';
import { CrearEncuestaComponent } from './pages/crear-encuesta/crear-encuesta';
import { HomeComponent } from './pages/home/home';
import { EncuestaDetalleComponent } from './pages/encuesta-detalle/encuesta-detalle';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'crear-encuesta', component: CrearEncuestaComponent },
  { path: 'editar-encuesta/:id', component: CrearEncuestaComponent },
  { path: 'encuesta/:id', component: EncuestaDetalleComponent }
];