import { async, TestBed } from '@angular/core/testing';

import { AppMocksCoreModule } from './mocks-core.module';

describe('AppMocksCoreModule', () => {
  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [AppMocksCoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppMocksCoreModule).toBeDefined();
  });
});
