import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConclusionComponent } from './game-conclusion.component';

describe('GameConclusionComponent', () => {
  let component: GameConclusionComponent;
  let fixture: ComponentFixture<GameConclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameConclusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
