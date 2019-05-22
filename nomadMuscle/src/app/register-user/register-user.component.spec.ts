import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUSerComponent } from './register-user.component';

describe('RegisterUSerComponent', () => {
  let component: RegisterUSerComponent;
  let fixture: ComponentFixture<RegisterUSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
