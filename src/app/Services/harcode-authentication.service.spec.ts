import { TestBed } from '@angular/core/testing';

import { HardcodeAuthenticationService } from './harcode-authentication.service';

describe('HarcodeAuthenticationService', () => {
  let service: HardcodeAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardcodeAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
