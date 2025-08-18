import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.services';
import { provideStore, StoreModule } from '@ngrx/store';

describe('MenuService', () => {
  let service: MenuService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(provideStore)],
    }).compileComponents();
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
