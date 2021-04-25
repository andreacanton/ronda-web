import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFiltersSheetComponent } from './users-filters-sheet.component';

describe('UsersFiltersSheetComponent', () => {
  let component: UsersFiltersSheetComponent;
  let fixture: ComponentFixture<UsersFiltersSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersFiltersSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFiltersSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
