import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationslandingComponent } from './donationslanding.component';

describe('DonationslandingComponent', () => {
  let component: DonationslandingComponent;
  let fixture: ComponentFixture<DonationslandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationslandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
