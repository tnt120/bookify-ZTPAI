import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseCardComponent } from './bookcase-card.component';

describe('BookcaseCardComponent', () => {
  let component: BookcaseCardComponent;
  let fixture: ComponentFixture<BookcaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookcaseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
