import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRoomComponent } from './register-room.component';

describe('RegisterRoomComponent', () => {
  let component: RegisterRoomComponent;
  let fixture: ComponentFixture<RegisterRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
