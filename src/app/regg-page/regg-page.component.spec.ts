import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggPageComponent } from './regg-page.component';

describe('ReggPageComponent', () => {
  let component: ReggPageComponent;
  let fixture: ComponentFixture<ReggPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReggPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReggPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
