import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppMaterialModule } from '@app/client-material';
import { AppTestingComponent } from '@app/client-testing-unit';

import { AppTooltipDirective } from './tooltip.directive';

describe('AppTooltipDirective', () => {
  let fixture: ComponentFixture<AppTestingComponent>;
  let debugElement: DebugElement;
  let directive: AppTooltipDirective;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AppMaterialModule.forRoot()],
      declarations: [AppTestingComponent, AppTooltipDirective],
      providers: [
        {
          provide: OverlayConfig,
          useFactory: () => new OverlayConfig(),
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppTestingComponent);
        debugElement = fixture.debugElement.query(By.directive(AppTooltipDirective));

        directive = debugElement.injector.get(AppTooltipDirective);

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should not show popover', () => {
    directive.appTooltip = void 0;
    const event = new Event('mouseenter');
    (debugElement.nativeElement as HTMLDivElement).dispatchEvent(event);
    expect((directive as unknown as { overlayRef: OverlayRef | null }).overlayRef).toBeNull();
  });

  it('should show popover', () => {
    directive.appTooltip = 'test';
    const event = new Event('mouseenter');
    (debugElement.nativeElement as HTMLDivElement).dispatchEvent(event);
    expect((directive as unknown as { overlayRef: OverlayRef | null }).overlayRef).not.toBeNull();
  });

  it('should dispose popover', () => {
    directive.appTooltip = 'test';
    const mouseenter = new Event('mouseenter');
    (debugElement.nativeElement as HTMLDivElement).dispatchEvent(mouseenter);
    expect((directive as unknown as { overlayRef: OverlayRef | null }).overlayRef).not.toBeNull();
    const mouseleave = new Event('mouseleave');
    (debugElement.nativeElement as HTMLDivElement).dispatchEvent(mouseleave);
    expect((directive as unknown as { overlayRef: OverlayRef | null }).overlayRef).toBeNull();
  });
});
