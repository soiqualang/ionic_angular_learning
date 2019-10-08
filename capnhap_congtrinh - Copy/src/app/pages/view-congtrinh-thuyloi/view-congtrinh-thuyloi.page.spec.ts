import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCongtrinhThuyloiPage } from './view-congtrinh-thuyloi.page';

describe('ViewCongtrinhThuyloiPage', () => {
  let component: ViewCongtrinhThuyloiPage;
  let fixture: ComponentFixture<ViewCongtrinhThuyloiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCongtrinhThuyloiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCongtrinhThuyloiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
