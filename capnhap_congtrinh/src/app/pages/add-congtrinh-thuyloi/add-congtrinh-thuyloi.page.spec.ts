import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCongtrinhThuyloiPage } from './add-congtrinh-thuyloi.page';

describe('AddCongtrinhThuyloiPage', () => {
  let component: AddCongtrinhThuyloiPage;
  let fixture: ComponentFixture<AddCongtrinhThuyloiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCongtrinhThuyloiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCongtrinhThuyloiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
