import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublishedBooksComponent } from './view-published-books.component';

describe('ViewPublishedBooksComponent', () => {
  let component: ViewPublishedBooksComponent;
  let fixture: ComponentFixture<ViewPublishedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPublishedBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPublishedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
