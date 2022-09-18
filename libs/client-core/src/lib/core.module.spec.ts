import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppCoreModule } from './core.module';

describe('AppCoreModule', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AppCoreModule],
    }).compileComponents();
  }));

  it('should be defined', () => {
    expect(AppCoreModule).toBeDefined();
    expect(AppCoreModule.forRoot).toEqual(expect.any(Function));
  });
});
