import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSlotComponent } from './error-slot.component';

describe('ErrorSlotComponent', () => {
  let component: ErrorSlotComponent;
  let fixture: ComponentFixture<ErrorSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
