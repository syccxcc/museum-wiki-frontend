import { TestBed } from '@angular/core/testing';

import { GetByCategoryService } from './get-by-category.service';

describe('GetByCategoryService', () => {
  let service: GetByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
