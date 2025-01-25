import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerWindowComponent } from './prayer-window.component';

describe('PrayerWindowComponent', () => {
  let component: PrayerWindowComponent;
  let fixture: ComponentFixture<PrayerWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
