import { TestBed, inject } from '@angular/core/testing';

import { TestCasesService } from './test-cases';

describe('TestCasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCasesService]
    });
  });

  it('should be created', inject([TestCasesService], (service: TestCasesService) => {
    expect(service).toBeTruthy();
  }));
});
