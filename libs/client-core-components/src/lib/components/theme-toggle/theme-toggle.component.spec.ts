import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppThemeToggleComponent } from './theme-toggle.component';

describe('AppThemeToggleComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [AppThemeToggleComponent],
  });

  let fixture: ComponentFixture<AppThemeToggleComponent>;
  let component: AppThemeToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppThemeToggleComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('toggleTheme should emit an output event', () => {
    component.darkThemeEnabled = null;
    const spy = vi.spyOn(component.themeToggled, 'emit');
    component.toggleTheme();
    expect(spy).not.toHaveBeenCalled();

    spy.mockClear();
    component.darkThemeEnabled = false;
    component.toggleTheme();
    expect(spy).toHaveBeenCalled();

    spy.mockClear();
    component.darkThemeEnabled = true;
    component.toggleTheme();
    expect(spy).toHaveBeenCalled();
  });
});
