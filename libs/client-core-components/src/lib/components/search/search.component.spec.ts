import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppSearchComponent } from './search.component';

describe('AppSearchComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [MatAutocompleteModule],
    declarations: [AppSearchComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });

  let fixture: ComponentFixture<AppSearchComponent>;
  let component: AppSearchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppSearchComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
