import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtrinhThuyloiPage } from './congtrinh-thuyloi.page';

describe('CongtrinhThuyloiPage', () => {
  let component: CongtrinhThuyloiPage;
  let fixture: ComponentFixture<CongtrinhThuyloiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongtrinhThuyloiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtrinhThuyloiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
