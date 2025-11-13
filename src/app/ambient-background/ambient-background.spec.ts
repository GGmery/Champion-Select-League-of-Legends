import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientBackground } from './ambient-background';

describe('AmbientBackground', () => {
  let component: AmbientBackground;
  let fixture: ComponentFixture<AmbientBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbientBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
