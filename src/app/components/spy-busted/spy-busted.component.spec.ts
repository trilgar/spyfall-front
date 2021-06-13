import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyBustedComponent } from './spy-busted.component';

describe('SpyBustedComponent', () => {
  let component: SpyBustedComponent;
  let fixture: ComponentFixture<SpyBustedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpyBustedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyBustedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
