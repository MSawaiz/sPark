import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperatorListComponent } from './view-operator-list.component';

describe('ViewOperatorListComponent', () => {
  let component: ViewOperatorListComponent;
  let fixture: ComponentFixture<ViewOperatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOperatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
