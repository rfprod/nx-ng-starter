import { async, TestBed } from '@angular/core/testing';
import { SharedCoreModule } from './shared-core.module';

describe('SharedCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedCoreModule).toBeDefined();
  });
});
