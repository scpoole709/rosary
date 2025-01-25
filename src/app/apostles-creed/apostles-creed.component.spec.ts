import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostlesCreedComponent } from './apostles-creed.component';

describe('ApostlesCreedComponent', () => {
  let component: ApostlesCreedComponent;
  let fixture: ComponentFixture<ApostlesCreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApostlesCreedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApostlesCreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
