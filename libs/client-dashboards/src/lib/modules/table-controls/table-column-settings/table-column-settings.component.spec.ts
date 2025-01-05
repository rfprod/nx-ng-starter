import { CommonModule } from '@angular/common';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';

import { AppTableColumnSettingsComponent } from './table-column-settings.component';

describe('AppTableColumnSettingsComponent', () => {
  let component: AppTableColumnSettingsComponent<Record<string, string>>;
  let fixture: ComponentFixture<AppTableColumnSettingsComponent<Record<string, string>>>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatListModule],
    declarations: [AppTableColumnSettingsComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppTableColumnSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
