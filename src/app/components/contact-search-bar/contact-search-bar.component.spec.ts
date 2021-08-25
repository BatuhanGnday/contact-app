import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearchBarComponent } from './contact-search-bar.component';

describe('HomeSearchBarComponent', () => {
  let component: ContactSearchBarComponent;
  let fixture: ComponentFixture<ContactSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
