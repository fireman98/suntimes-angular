import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesParametersComponent } from './times-parameters.component';

describe('TimesParametersComponent', () => {
  let component: TimesParametersComponent;
  let fixture: ComponentFixture<TimesParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
