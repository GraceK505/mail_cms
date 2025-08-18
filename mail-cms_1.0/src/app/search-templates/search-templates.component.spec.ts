import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTemplatesComponent } from './search-templates.component';

describe('SearchTemplatesComponent', () => {
  let component: SearchTemplatesComponent;
  let fixture: ComponentFixture<SearchTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
