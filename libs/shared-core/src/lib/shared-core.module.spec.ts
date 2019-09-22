import { TestBed, async } from '@angular/core/testing';
import { SharedCoreModule } from './shared-core.module';

describe('SharedCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedCoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(SharedCoreModule).toBeDefined();
  });
});
