import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppStoreModule } from './store.module';

describe('AppStoreModule', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AppStoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(AppStoreModule).toBeDefined();
  });
});
