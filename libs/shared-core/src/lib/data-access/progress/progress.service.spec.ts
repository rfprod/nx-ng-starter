import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { OverlayRefMock } from '@nx-ng-starter/mocks-core';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;
  let overlayRef: OverlayRef;
  let attachSpy: jest.SpyInstance;
  let detachSpy: jest.SpyInstance;
  let hasAttachedSpy: jest.SpyInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OverlayModule],
      providers: [
        {
          provide: OverlayRef,
          useValue: new OverlayRefMock(),
        },
        {
          provide: ProgressService,
          useFactory: (overlay: OverlayRef) => new ProgressService(overlay),
          deps: [OverlayRef],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(ProgressService);
        overlayRef = TestBed.get(OverlayRef);
        attachSpy = jest.spyOn(overlayRef, 'attach');
        detachSpy = jest.spyOn(overlayRef, 'detach');
        hasAttachedSpy = jest.spyOn(overlayRef, 'hasAttached').mockReturnValue(false);
      });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.show).toBeDefined();
    expect(service.hide).toBeDefined();
  });

  describe('#overlay attach-detach', () => {
    it('should attach overlay on show call', fakeAsync(() => {
      service.show();
      tick();
      expect(attachSpy).toHaveBeenCalled();
      expect(detachSpy).not.toHaveBeenCalled();
    }));

    it('should detach overlay on sequential show and hide calls', fakeAsync(() => {
      service.show();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.hide();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(1);
    }));

    it('should not detach after single hide call', fakeAsync(() => {
      service.hide();
      tick();
      expect(attachSpy).not.toHaveBeenCalled();
    }));

    it('should attach and detach overlay only once', fakeAsync(() => {
      service.show();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.show();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.show();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.hide();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.hide();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(0);

      hasAttachedSpy.mockReturnValue(true);
      service.hide();
      tick();
      expect(attachSpy).toHaveBeenCalledTimes(1);
      expect(detachSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
