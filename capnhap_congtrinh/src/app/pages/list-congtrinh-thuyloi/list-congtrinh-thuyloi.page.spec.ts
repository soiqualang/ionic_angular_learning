import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongtrinhThuyloiPage } from './list-congtrinh-thuyloi.page';

describe('ListCongtrinhThuyloiPage', () => {
  let component: ListCongtrinhThuyloiPage;
  let fixture: ComponentFixture<ListCongtrinhThuyloiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongtrinhThuyloiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongtrinhThuyloiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
