import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSqlPage } from './form-sql.page';

describe('FormSqlPage', () => {
  let component: FormSqlPage;
  let fixture: ComponentFixture<FormSqlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSqlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSqlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
