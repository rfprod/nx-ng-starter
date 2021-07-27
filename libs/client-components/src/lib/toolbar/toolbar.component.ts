import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppSidebarState, chatbotActions, sidebarActions } from '@app/client-store';
import { IToolbarButton } from '@app/client-util';
import { Store } from '@ngxs/store';
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
      routerLink: [{ outlets: { primary: [''], sidebar: [] } }],
      icon: 'home',
      title: 'Home',
    },
    {
      routerLink: [{ outlets: { primary: ['info'], sidebar: [] } }],
      icon: 'touch_app',
      title: 'API info',
    },
    {
      routerLink: [{ outlets: { primary: ['chatbot'], sidebar: [] } }],
      icon: 'chat',
      title: 'Chat',
    },
  ];

  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

  constructor(public readonly store: Store) {}

  public toggleSidebar(): void {
    void this.store.dispatch(new sidebarActions.toggleSidebar());
  }

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.setState({ sidebarOpened: false }));
  }
}
