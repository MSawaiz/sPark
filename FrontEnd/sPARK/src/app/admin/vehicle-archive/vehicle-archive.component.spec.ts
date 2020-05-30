import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleArchiveComponent } from './vehicle-archive.component';

describe('VehicleArchiveComponent', () => {
  let component: VehicleArchiveComponent;
  let fixture: ComponentFixture<VehicleArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
