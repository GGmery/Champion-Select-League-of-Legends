import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionDetail } from './champion-detail';

describe('ChampionDetail', () => {
  let component: ChampionDetail;
  let fixture: ComponentFixture<ChampionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
