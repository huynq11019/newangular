import { TestBed } from '@angular/core/testing';

import { UploadfileServiceService } from './uploadfile-service.service';

describe('UploadfileServiceService', () => {
  let service: UploadfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
