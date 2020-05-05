import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOfCountryComponent } from './graph-of-country.component';

describe('GraphOfCountryComponent', () => {
  let component: GraphOfCountryComponent;
  let fixture: ComponentFixture<GraphOfCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphOfCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOfCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
