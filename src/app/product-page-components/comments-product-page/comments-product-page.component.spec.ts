import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsProductPageComponent } from './comments-product-page.component';

describe('CommentsProductPageComponent', () => {
  let component: CommentsProductPageComponent;
  let fixture: ComponentFixture<CommentsProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
