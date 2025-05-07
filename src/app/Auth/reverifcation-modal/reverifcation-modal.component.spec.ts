import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverifcationModalComponent } from './reverifcation-modal.component';

describe('ReverifcationModalComponent', () => {
  let component: ReverifcationModalComponent;
  let fixture: ComponentFixture<ReverifcationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReverifcationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverifcationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
