import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSlotComponent } from './search-slot.component';

describe('SearchSlotComponent', () => {
  let component: SearchSlotComponent;
  let fixture: ComponentFixture<SearchSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
