import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { chatbotAction } from '@app/client-store-chatbot';
import { routerAction } from '@app/client-store-router';
import { sidebarAction } from '@app/client-store-sidebar';
import { testingEnvironment } from '@app/client-testing-unit';
import { WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';
import { lastValueFrom, of } from 'rxjs';

import { AppRootComponent } from './root.component';

describe('AppRootComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppRootComponent],
    providers: [
      Title,
      Meta,
      {
        provide: AppServiceWorkerService,
        useValue: {
          subscribeToUpdates$: of(null),
        },
      },
      {
        provide: Store,
        useValue: {
          select: () => of(null),
          dispatch: () => void 0,
        },
      },
      {
        provide: WEB_CLIENT_APP_ENV,
        useValue: { ...testingEnvironment },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppRootComponent>;
  let component: AppRootComponent;
  let title: Title;
  let setTitleSpy: jest.SpyInstance;
  let meta: Meta;
  let updateTagSpy: jest.SpyInstance;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    title = TestBed.inject(Title);
    setTitleSpy = jest.spyOn(title, 'setTitle');
    meta = TestBed.inject(Meta);
    updateTagSpy = jest.spyOn(meta, 'updateTag');
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(setTitleSpy).toHaveBeenCalled();
    expect(updateTagSpy).toHaveBeenCalled();
  });

  it('toggleMaterialTheme should set the darkTheme value', () => {
    expect(component.darkTheme).toBeFalsy();
    component.toggleTheme(true);
    expect(component.darkTheme).toBeTruthy();
    component.toggleTheme(false);
    expect(component.darkTheme).toBeFalsy();
  });

  it('logoSrc$ should return dark logo reference based on the value of the darkTheme state', async () => {
    expect(component.darkTheme).toBeFalsy();
    const darkLogoRef = await lastValueFrom(component.logoSrc$);
    expect(darkLogoRef).toContain('logo.svg');
    expect(darkLogoRef).not.toContain('logo-light.svg');
  });

  it('toggleSidebar should call store dispatch', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.toggleSidebar();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(sidebarAction.toggle());
  });

  it('toggleChatbot should call store dispatch events depending on the parameter', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.toggleChatbot(true);
    const calls = {
      first: 1,
      second: 2,
    };
    expect(storeSpy).toHaveBeenCalledTimes(calls.first);
    expect(storeSpy).toHaveBeenNthCalledWith(calls.first, chatbotAction.open());

    component.toggleChatbot(false);
    expect(storeSpy).toHaveBeenCalledTimes(calls.second);
    expect(storeSpy).toHaveBeenNthCalledWith(calls.second, chatbotAction.close());
  });

  it('navButtonClick should call store dispatch', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.navButtonClick();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(sidebarAction.close({ payload: { navigate: false } }));
  });

  it('navigateBack should call store dispatch', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.navigateBack();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(routerAction.back());
  });

  it('navigateForward should call store dispatch', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.navigateForward();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(routerAction.forward());
  });
});
