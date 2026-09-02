import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ExpenseSummaryComponent } from './expense-summary.component';

describe('ExpenseSummaryComponent', () => {
  let component: ExpenseSummaryComponent;
  let fixture: ComponentFixture<ExpenseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseSummaryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the expense summary component can be created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
