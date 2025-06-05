import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsAndResponsesComponent } from './comments-and-responses.component';

describe('CommentsAndResponsesComponent', () => {
  let component: CommentsAndResponsesComponent;
  let fixture: ComponentFixture<CommentsAndResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsAndResponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsAndResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
