import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCongHientrangPointPage } from './add-cong-hientrang-point.page';

describe('AddCongHientrangPointPage', () => {
  let component: AddCongHientrangPointPage;
  let fixture: ComponentFixture<AddCongHientrangPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCongHientrangPointPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCongHientrangPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
