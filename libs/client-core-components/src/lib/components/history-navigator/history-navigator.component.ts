import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-history-navigator',
  templateUrl: './history-navigator.component.html',
  styleUrls: ['./history-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHistoryNavigatorComponent {
  @Output() public readonly nagivateBack = new EventEmitter<void>();

  @Output() public readonly nagivateForward = new EventEmitter<void>();

  public back(): void {
    this.nagivateBack.emit();
  }

  public forward(): void {
    this.nagivateForward.emit();
  }
}
