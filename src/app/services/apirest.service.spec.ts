import { TestBed } from '@angular/core/testing';

import { APIRestService } from './apirest.service';

describe('APIRestService', () => {
  let service: APIRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
