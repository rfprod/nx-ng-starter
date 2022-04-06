import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { trackChanges } from './track-changes.decorator';

interface IInputChanges extends SimpleChanges {
  input: SimpleChange;
}

const controlSuffix = 'Changes';

@Component({
  selector: 'app-track-changes-testing-component',
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AppTrackChangesTestingComponent implements OnChanges {
  @Input() public input?: string;

  public control = '';

  @trackChanges<AppTrackChangesTestingComponent, string | undefined>('noinput', 'inputChangeHandler')
  @trackChanges<AppTrackChangesTestingComponent, string | undefined>('input', 'inputChangeHandler')
  public ngOnChanges(changes: IInputChanges) {
    return changes;
  }

  public inputChangeHandler(value: string): void {
    this.control = `${value}${controlSuffix}`;
  }
}

describe('trackChanges', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppTrackChangesTestingComponent],
  };

  let fixture: ComponentFixture<AppTrackChangesTestingComponent>;
  let component: AppTrackChangesTestingComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppTrackChangesTestingComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should process changes as expected when the input value change is defined', () => {
    expect(component.input).toBeUndefined();
    expect(component.control).toEqual('');
    const input = 'test';
    component.ngOnChanges({
      input: {
        currentValue: input,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: null,
      },
    });
    expect(component.control).toEqual(`${input}${controlSuffix}`);
  });

  it('should process changes as expected when the input value change is undefined', () => {
    expect(component.input).toBeUndefined();
    expect(component.control).toEqual('');
    const input = void 0;
    component.ngOnChanges({
      input: {
        currentValue: input,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: null,
      },
    });
    expect(component.control).toEqual(component.control);
  });
});
