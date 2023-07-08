import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { AppDirectivesModule } from '@app/client-directives';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';

import { AppTableComponent } from './table.component';

describe('AppTableComponent', () => {
  let component: AppTableComponent;
  let fixture: ComponentFixture<AppTableComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppDirectivesModule],
    declarations: [AppTableComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
