import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDisplayModalComponent } from './page-display-modal.component';

describe('PageDisplayModalComponent', () => {
  let component: PageDisplayModalComponent;
  let fixture: ComponentFixture<PageDisplayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDisplayModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
