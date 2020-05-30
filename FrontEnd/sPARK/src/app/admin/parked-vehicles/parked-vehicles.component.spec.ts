import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkedVehiclesComponent } from './parked-vehicles.component';

describe('ParkedVehiclesComponent', () => {
  let component: ParkedVehiclesComponent;
  let fixture: ComponentFixture<ParkedVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkedVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
