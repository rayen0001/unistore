import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVendorsComponent } from './top-vendors.component';

describe('TopVendorsComponent', () => {
  let component: TopVendorsComponent;
  let fixture: ComponentFixture<TopVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopVendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
