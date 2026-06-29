import { TestBed } from '@angular/core/testing';

import { EditorJSService } from './editor-js.service';

describe('EditorJSService', () => {
  let service: EditorJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
