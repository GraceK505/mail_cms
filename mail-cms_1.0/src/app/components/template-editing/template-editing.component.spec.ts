import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditingComponent } from './template-editing.component';

describe('TemplateEditingComponent', () => {
  let component: TemplateEditingComponent;
  let fixture: ComponentFixture<TemplateEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
