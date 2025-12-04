import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaDetalle } from './encuesta-detalle';

describe('EncuestaDetalle', () => {
  let component: EncuestaDetalle;
  let fixture: ComponentFixture<EncuestaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
