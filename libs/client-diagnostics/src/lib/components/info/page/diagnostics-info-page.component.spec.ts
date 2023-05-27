import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

describe('AppDiagnosticsInfoPage', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsInfoPage],
    imports: [MatIconModule, MatListModule],
  });

  let fixture: ComponentFixture<AppDiagnosticsInfoPage>;
  let component: AppDiagnosticsInfoPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppDiagnosticsInfoPage);
    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
