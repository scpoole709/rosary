import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosaryBgComponent } from './rosary-bg.component';

describe('RosaryBgComponent', () => {
  let component: RosaryBgComponent;
  let fixture: ComponentFixture<RosaryBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosaryBgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosaryBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
