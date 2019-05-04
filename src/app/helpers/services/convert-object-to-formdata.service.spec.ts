import { TestBed } from '@angular/core/testing';

import { ConvertObjectToFormdataService } from './convert-object-to-formdata.service';

describe('ConvertObjectToFormdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvertObjectToFormdataService = TestBed.get(ConvertObjectToFormdataService);
    expect(service).toBeTruthy();
  });
});
