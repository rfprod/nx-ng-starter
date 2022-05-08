import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppClientStoreModule } from './client-store.module';

describe('AppClientStoreModule', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AppClientStoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(AppClientStoreModule).toBeDefined();
  });
});
