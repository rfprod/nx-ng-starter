import { TestBed, async } from '@angular/core/testing';
import { MocksCoreModule } from './mocks-core.module';

describe('MocksCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksCoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MocksCoreModule).toBeDefined();
  });
});
