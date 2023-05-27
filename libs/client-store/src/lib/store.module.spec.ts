import { TestBed } from '@angular/core/testing';

import { AppStoreModule } from './store.module';

describe('AppStoreModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppStoreModule] }).compileComponents();
  });

  it('should be defined', () => {
    expect(AppStoreModule).toBeDefined();
  });
});
