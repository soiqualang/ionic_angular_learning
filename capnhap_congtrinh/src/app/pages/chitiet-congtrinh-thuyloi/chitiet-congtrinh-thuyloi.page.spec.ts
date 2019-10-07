import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietCongtrinhThuyloiPage } from './chitiet-congtrinh-thuyloi.page';

describe('ChitietCongtrinhThuyloiPage', () => {
  let component: ChitietCongtrinhThuyloiPage;
  let fixture: ComponentFixture<ChitietCongtrinhThuyloiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietCongtrinhThuyloiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietCongtrinhThuyloiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
