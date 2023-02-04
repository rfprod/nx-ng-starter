import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { testingEnvironment } from '@app/client-testing-unit';
import { WEB_CLIENT_APP_ENV } from '@app/client-util';
import { of } from 'rxjs';

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

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppRootComponent);
        component = fixture.componentInstance;
        title = TestBed.inject(Title);
        setTitleSpy = jest.spyOn(title, 'setTitle');
        meta = TestBed.inject(Meta);
        updateTagSpy = jest.spyOn(meta, 'updateTag');
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(setTitleSpy).toHaveBeenCalled();
    expect(updateTagSpy).toHaveBeenCalled();
  });

  it('toggleMaterialTheme should set the darkTheme value', () => {
    expect(component.darkTheme).toBeFalsy();
    component.toggleMaterialTheme(true);
    expect(component.darkTheme).toBeTruthy();
    component.toggleMaterialTheme(false);
    expect(component.darkTheme).toBeFalsy();
  });
});
