import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuntimesComponent } from './suntimes.component';

describe('SuntimesComponent', () => {
  let component: SuntimesComponent;
  let fixture: ComponentFixture<SuntimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuntimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuntimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
