import { TestBed } from '@angular/core/testing';

import { PublisherRouteGuardService } from './publisher-route-guard.service';

describe('PublisherRouteGuardService', () => {
  let service: PublisherRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
