import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ExpenseSummaryComponent } from './expense-summary.component';

describe('ExpenseSummaryComponent', () => {
  let component: ExpenseSummaryComponent;
  let fixture: ComponentFixture<ExpenseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseSummaryComponent],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
