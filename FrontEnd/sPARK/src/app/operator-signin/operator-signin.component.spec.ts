import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSigninComponent } from './operator-signin.component';

describe('OperatorSigninComponent', () => {
  let component: OperatorSigninComponent;
  let fixture: ComponentFixture<OperatorSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
