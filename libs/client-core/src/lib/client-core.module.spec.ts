import { async, TestBed } from '@angular/core/testing';

import { AppClientCoreModule } from './client-core.module';

describe('AppClientCoreModule', () => {
  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [AppClientCoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(AppClientCoreModule).toBeDefined();
  });
});
