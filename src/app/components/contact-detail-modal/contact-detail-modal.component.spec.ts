import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailModalComponent } from './contact-detail-modal.component';

describe('ContactDetailModalComponent', () => {
  let component: ContactDetailModalComponent;
  let fixture: ComponentFixture<ContactDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
