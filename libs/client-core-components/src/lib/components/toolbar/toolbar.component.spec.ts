import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppToolbarComponent } from './toolbar.component';

describe('AppToolbarComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [MatMenuModule, MatIconModule],
    declarations: [AppToolbarComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });

  let fixture: ComponentFixture<AppToolbarComponent>;
  let component: AppToolbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppToolbarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('toggleSidebar should emit an output event', () => {
    const spy = vi.spyOn(component.sidebarToggled, 'emit');
    component.toggleSidebar();
    expect(spy).toHaveBeenCalled();
  });

  it('toggleChatbot should emit an output event', () => {
    const spy = vi.spyOn(component.chatbotToggled, 'emit');
    component.toggleChatbot(new MouseEvent('click'));
    expect(spy).toHaveBeenCalledWith(!(component.chatbotOpen ?? false));

    component.chatbotOpen = null;
    spy.mockClear();
    component.toggleChatbot(new KeyboardEvent('Enter', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('toggleTheme should emit an output event', () => {
    const spy = vi.spyOn(component.themeToggled, 'emit');
    component.toggleTheme();
    expect(spy).toHaveBeenCalledWith(!(component.darkThemeEnabled ?? false));

    component.darkThemeEnabled = null;
    spy.mockClear();
    component.toggleTheme();
    expect(spy).not.toHaveBeenCalled();
  });
});
