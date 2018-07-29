import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuySellComponent } from './dialog-buy-sell.component';

describe('DialogBuySellComponent', () => {
  let component: DialogBuySellComponent;
  let fixture: ComponentFixture<DialogBuySellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBuySellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBuySellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
