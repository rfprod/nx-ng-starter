import { async, TestBed } from '@angular/core/testing';

import { SharedCoreModule } from './shared-core.module';

describe('SharedCoreModule', () => {
  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [SharedCoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(SharedCoreModule).toBeDefined();
  });
});
