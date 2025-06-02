import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductPageComponent } from './main-product-page.component';

describe('MainProductPageComponent', () => {
  let component: MainProductPageComponent;
  let fixture: ComponentFixture<MainProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
