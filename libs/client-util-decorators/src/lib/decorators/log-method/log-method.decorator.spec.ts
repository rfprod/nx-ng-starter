import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { logMethod } from './log-method.decorator';

@Component({
  selector: 'app-log-method-testing-component',
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class AppLogMethodTestingComponent {
  @logMethod(true)
  public logEnabled(options: { test: string }) {
    return options;
  }

  @logMethod()
  public logEnabledImplicitly(options: { test: string }) {
    return options;
  }

  @logMethod(false)
  public logDisabled(options: { test: string }) {
    return options;
  }
}

describe('trackChanges', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppLogMethodTestingComponent],
  };

  let fixture: ComponentFixture<AppLogMethodTestingComponent>;
  let component: AppLogMethodTestingComponent;

  let spy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppLogMethodTestingComponent);
    component = fixture.componentInstance;
    spy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should log changes if attached and enabled explicitly', () => {
    component.logEnabled({ test: 'test' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should log changes if attached and enabled implicitly', () => {
    component.logEnabledImplicitly({ test: 'test' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not log changes if attached and disabled', () => {
    component.logDisabled({ test: 'test' });
    expect(spy).not.toHaveBeenCalled();
  });
});
