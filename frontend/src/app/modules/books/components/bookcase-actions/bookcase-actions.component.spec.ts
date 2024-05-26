import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseActionsComponent } from './bookcase-actions.component';

describe('BookcaseActionsComponent', () => {
  let component: BookcaseActionsComponent;
  let fixture: ComponentFixture<BookcaseActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookcaseActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcaseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
