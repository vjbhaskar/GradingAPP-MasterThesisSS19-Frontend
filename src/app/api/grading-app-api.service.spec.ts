import { TestBed } from '@angular/core/testing';

import { GradingAppApiService } from './grading-app-api.service';

describe('GradingAppApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradingAppApiService = TestBed.get(GradingAppApiService);
    expect(service).toBeTruthy();
  });
});
