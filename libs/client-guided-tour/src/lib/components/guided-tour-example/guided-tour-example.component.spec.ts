import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGuidedTourExampleComponent } from './guided-tour-example.component';

describe('AppGuidedTourExampleComponent', () => {
  let component: AppGuidedTourExampleComponent;
  let fixture: ComponentFixture<AppGuidedTourExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppGuidedTourExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppGuidedTourExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
