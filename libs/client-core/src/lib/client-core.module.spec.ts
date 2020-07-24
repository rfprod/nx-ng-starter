import { async, TestBed } from '@angular/core/testing';

import { AppSharedCoreModule } from './client-core.module';

describe('AppSharedCoreModule', () => {
  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [AppSharedCoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(AppSharedCoreModule).toBeDefined();
  });
});
