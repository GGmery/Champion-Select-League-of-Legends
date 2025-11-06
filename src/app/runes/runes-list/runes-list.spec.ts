import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunesList } from './runes-list';

describe('RunesList', () => {
  let component: RunesList;
  let fixture: ComponentFixture<RunesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
