import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCongHientrangPointPage } from './view-cong-hientrang-point.page';

describe('ViewCongHientrangPointPage', () => {
  let component: ViewCongHientrangPointPage;
  let fixture: ComponentFixture<ViewCongHientrangPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCongHientrangPointPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCongHientrangPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
