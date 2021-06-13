import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessLocationComponent } from './guess-location.component';

describe('GuessLocationComponent', () => {
  let component: GuessLocationComponent;
  let fixture: ComponentFixture<GuessLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
