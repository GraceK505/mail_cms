import { TestBed } from '@angular/core/testing';

import { ConvertService } from './mjml-converter.service';

describe('MjmlConverterService', () => {
  let service: ConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
