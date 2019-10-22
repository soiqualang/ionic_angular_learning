import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongHientrangPointPage } from './list-cong-hientrang-point.page';

describe('ListCongHientrangPointPage', () => {
  let component: ListCongHientrangPointPage;
  let fixture: ComponentFixture<ListCongHientrangPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongHientrangPointPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongHientrangPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
