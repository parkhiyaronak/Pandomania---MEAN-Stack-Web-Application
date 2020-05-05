import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationstableComponent } from './donationstable.component';

describe('DonationstableComponent', () => {
  let component: DonationstableComponent;
  let fixture: ComponentFixture<DonationstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
