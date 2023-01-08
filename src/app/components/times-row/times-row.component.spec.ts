import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesRowComponent } from './times-row.component';

describe('TimesRowComponent', () => {
  let component: TimesRowComponent;
  let fixture: ComponentFixture<TimesRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
