import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingDialogComponent } from './reading-dialog.component';

describe('ReadingDialogComponent', () => {
  let component: ReadingDialogComponent;
  let fixture: ComponentFixture<ReadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
