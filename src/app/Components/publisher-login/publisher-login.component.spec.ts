import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherLoginComponent } from './publisher-login.component';

describe('PublisherLoginComponent', () => {
  let component: PublisherLoginComponent;
  let fixture: ComponentFixture<PublisherLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublisherLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
