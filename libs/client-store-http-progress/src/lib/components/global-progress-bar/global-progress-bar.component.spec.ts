import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppGlobalProgressBarComponent } from './global-progress-bar.component';

describe('AppGlobalProgressBarComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [MatProgressBarModule],
    declarations: [AppGlobalProgressBarComponent],
  };

  let fixture: ComponentFixture<AppGlobalProgressBarComponent>;
  let component: AppGlobalProgressBarComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppGlobalProgressBarComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ngAfterViewInit should set progressBar width', () => {
    component.ngAfterViewInit();
    expect((component.progressBar?._elementRef.nativeElement as HTMLElement).style.width).toEqual(`${document.body.clientWidth}px`);
  });

  it('should not break if there is no progressBar ref', () => {
    component.progressBar = void 0;
    component.ngAfterViewInit();
    expect(component.progressBar).toBeUndefined();
  });
});
