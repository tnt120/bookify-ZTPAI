import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuthorDialogComponent } from './manage-author-dialog.component';

describe('ManageAuthorDialogComponent', () => {
  let component: ManageAuthorDialogComponent;
  let fixture: ComponentFixture<ManageAuthorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAuthorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
