import { TestBed, inject } from '@angular/core/testing';

import { PlatformsService } from './platforms';

describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatformsService]
    });
  });

  it('should be created', inject([PlatformsService], (service: PlatformsService) => {
    expect(service).toBeTruthy();
  }));
});
