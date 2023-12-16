import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGuidedTourComponent } from './guided-tour.component';
import { GUIDED_TOUR_DATA, IGuidedTourData } from './guided-tour.interface';

describe('AppGuidedTourComponent', () => {
  let component: AppGuidedTourComponent;
  let fixture: ComponentFixture<AppGuidedTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppGuidedTourComponent],
      providers: [
        {
          provide: GUIDED_TOUR_DATA,
          useValue: <IGuidedTourData>{
            index: 0,
            title: 'title',
            subtitle: 'subtitle',
            description: 'description',
            first: true,
            last: true,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppGuidedTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
