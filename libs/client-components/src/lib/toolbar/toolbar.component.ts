import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppSidebarState, chatbotActions, sidebarActions } from '@nx-ng-starter/client-store';
import { IToolbarButton } from '@nx-ng-starter/client-util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  @Input() public buttons: IToolbarButton[] = [
    {
      routerLink: [''],
      icon: 'home',
      title: 'Home',
    },
    {
      routerLink: ['info'],
      icon: 'touch_app',
      title: 'API info',
    },
    {
      routerLink: ['chatbot'],
      icon: 'chat',
      title: 'Chat',
    },
  ];

  public readonly sidebarOpened$ = this.store
    .select(AppSidebarState.getState)
    .pipe(map(state => state.sidebarOpened));

  constructor(public readonly store: Store) {}

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.closeSidebar());
  }

  public sidebarOpenHandler(): void {
    void this.store.dispatch(new sidebarActions.openSidebar());
  }

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }
}
