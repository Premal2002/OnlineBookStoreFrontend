import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublisherComponent } from './manage-publisher.component';

describe('ManagePublisherComponent', () => {
  let component: ManagePublisherComponent;
  let fixture: ComponentFixture<ManagePublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
