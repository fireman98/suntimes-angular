import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesViewComponent } from './times-view.component';

describe('TimesViewComponent', () => {
  let component: TimesViewComponent;
  let fixture: ComponentFixture<TimesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
