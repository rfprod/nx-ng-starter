import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, signal } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppNavigatorComponent {
  public showSearch = signal(false);

  @Output() public readonly nagivateBack = new EventEmitter<void>();

  @Output() public readonly nagivateForward = new EventEmitter<void>();

  public back(): void {
    this.nagivateBack.emit();
  }

  public forward(): void {
    this.nagivateForward.emit();
  }

  public toggleSearch() {
    this.showSearch.update(value => !value);
  }

  @HostListener('window:keydown', ['$event'])
  public keyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.shiftKey && event.key === '~') {
      this.toggleSearch();
    }
    if (event.key === 'Escape') {
      this.showSearch.set(false);
    }
  }
}
