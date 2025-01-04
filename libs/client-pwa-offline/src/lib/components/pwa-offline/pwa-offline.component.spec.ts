import { CommonModule, Location } from '@angular/common';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppPwaOfflineComponent } from './pwa-offline.component';

describe('AppPwaOfflineComponent', () => {
  const testBedMetadata: TestModuleMetadata = {
    imports: [CommonModule, MatIconModule, MatButtonModule],
    declarations: [AppPwaOfflineComponent],
    providers: [Location],
  };

  let component: AppPwaOfflineComponent;
  let fixture: ComponentFixture<AppPwaOfflineComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedMetadata).compileComponents();

    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppPwaOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('back should call location.back', () => {
    const spy = jest.spyOn(location, 'back');
    component.back();
    expect(spy).toHaveBeenCalled();
  });
});
