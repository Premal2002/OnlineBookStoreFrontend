import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPubPasswordComponent } from './forgot-pub-password.component';

describe('ForgotPubPasswordComponent', () => {
  let component: ForgotPubPasswordComponent;
  let fixture: ComponentFixture<ForgotPubPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPubPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPubPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
