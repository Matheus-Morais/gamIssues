import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissoesComponent } from './missoes.component';

describe('MissoesComponent', () => {
  let component: MissoesComponent;
  let fixture: ComponentFixture<MissoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
