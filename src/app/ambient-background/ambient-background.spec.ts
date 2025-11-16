import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientBackgroundComponent } from './ambient-background';

describe('AmbientBackground', () => {
  let component: AmbientBackgroundComponent;
  let fixture: ComponentFixture<AmbientBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbientBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
