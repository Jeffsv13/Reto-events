import { TestBed } from '@angular/core/testing';

import { MyPurchasesService } from './my-purchases.service';

describe('MyPurchasesService', () => {
  let service: MyPurchasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPurchasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
