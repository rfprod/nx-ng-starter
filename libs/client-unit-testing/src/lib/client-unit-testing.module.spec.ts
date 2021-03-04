import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppMocksCoreModule } from './client-unit-testing.module';

describe('AppMocksCoreModule', () => {
  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        imports: [AppMocksCoreModule],
      }).compileComponents();
    }),
  );

  it('should create', () => {
    expect(AppMocksCoreModule).toBeDefined();
  });
});
