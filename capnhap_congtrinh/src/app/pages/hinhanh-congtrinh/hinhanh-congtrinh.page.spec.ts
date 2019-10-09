import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhanhCongtrinhPage } from './hinhanh-congtrinh.page';

describe('HinhanhCongtrinhPage', () => {
  let component: HinhanhCongtrinhPage;
  let fixture: ComponentFixture<HinhanhCongtrinhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhanhCongtrinhPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhanhCongtrinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
