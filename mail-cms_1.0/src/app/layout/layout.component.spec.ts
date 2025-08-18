import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { provideStore, StoreModule } from '@ngrx/store';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LayoutComponent, StoreModule.forRoot(provideStore)],
      }).compileComponents();
    });
  
    it('should create the app', () => {
      const fixture = TestBed.createComponent(LayoutComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  
    it('should render title', () => {
      const fixture = TestBed.createComponent(LayoutComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-test');
    });
});
