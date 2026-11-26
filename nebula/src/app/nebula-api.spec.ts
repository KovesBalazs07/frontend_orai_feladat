import { TestBed } from '@angular/core/testing';
import { NebulaApi } from './nebula-api';

describe('NebulaApi', () => {
  let service: NebulaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NebulaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
