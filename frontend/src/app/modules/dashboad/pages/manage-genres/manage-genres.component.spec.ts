import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGenresComponent } from './manage-genres.component';

describe('ManageGenresComponent', () => {
  let component: ManageGenresComponent;
  let fixture: ComponentFixture<ManageGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageGenresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
