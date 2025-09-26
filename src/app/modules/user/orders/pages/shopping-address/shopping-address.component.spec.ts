import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingAddressComponent } from './shopping-address.component';

describe('ShoppingAddressComponent', () => {
  let component: ShoppingAddressComponent;
  let fixture: ComponentFixture<ShoppingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
