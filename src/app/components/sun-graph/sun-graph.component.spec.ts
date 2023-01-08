import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunGraphComponent } from './sun-graph.component';

describe('SunGraphComponent', () => {
  let component: SunGraphComponent;
  let fixture: ComponentFixture<SunGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
