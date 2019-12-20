import { TestBed, async } from '@angular/core/testing';
import { ProtoModule } from './proto.module';

describe('ProtoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProtoModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProtoModule).toBeDefined();
  });
});
