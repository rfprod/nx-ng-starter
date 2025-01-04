import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { trackChanges } from './track-changes.decorator';

const controlSuffix = 'Changes';

@Component({
  selector: 'app-track-changes-testing-component',
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class AppTrackChangesTestingComponent implements OnChanges {
  @Input() public input?: string;

  public control = '';

  @trackChanges<AppTrackChangesTestingComponent, string | undefined>('noinput', 'inputChangeHandler')
  @trackChanges<AppTrackChangesTestingComponent, string | undefined>('input', 'inputChangeHandler')
  public ngOnChanges(changes: SimpleChanges) {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppTrackChangesTestingComponent);
    component = fixture.componentInstance;
  });

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
