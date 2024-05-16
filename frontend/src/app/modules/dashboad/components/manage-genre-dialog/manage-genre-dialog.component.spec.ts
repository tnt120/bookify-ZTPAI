import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGenreDialogComponent } from './manage-genre-dialog.component';

describe('ManageGenreDialogComponent', () => {
  let component: ManageGenreDialogComponent;
  let fixture: ComponentFixture<ManageGenreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageGenreDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
