import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookInfoComponent } from './single-book-info.component';

describe('SingleBookInfoComponent', () => {
  let component: SingleBookInfoComponent;
  let fixture: ComponentFixture<SingleBookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleBookInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
