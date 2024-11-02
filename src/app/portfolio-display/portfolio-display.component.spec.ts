import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDisplayComponent } from './portfolio-display.component';

describe('PortfolioDisplayComponent', () => {
  let component: PortfolioDisplayComponent;
  let fixture: ComponentFixture<PortfolioDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
