import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseProgresDialogComponent } from './bookcase-progres-dialog.component';

describe('BookcaseProgresDialogComponent', () => {
  let component: BookcaseProgresDialogComponent;
  let fixture: ComponentFixture<BookcaseProgresDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookcaseProgresDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcaseProgresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
