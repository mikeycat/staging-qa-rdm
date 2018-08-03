import { TestBed, inject } from '@angular/core/testing';

import { TestSuitesService } from './test-suites';

describe('TestSuitesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestSuitesService]
    });
  });

  it('should be created', inject([TestSuitesService], (service: TestSuitesService) => {
    expect(service).toBeTruthy();
  }));
});
