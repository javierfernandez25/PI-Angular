import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEncuesta } from './crear-encuesta';

describe('CrearEncuesta', () => {
  let component: CrearEncuesta;
  let fixture: ComponentFixture<CrearEncuesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEncuesta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEncuesta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
