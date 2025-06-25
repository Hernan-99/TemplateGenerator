import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCampaingComponent } from './item-campaing.component';

describe('ItemCampaingComponent', () => {
  let component: ItemCampaingComponent;
  let fixture: ComponentFixture<ItemCampaingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCampaingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCampaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
