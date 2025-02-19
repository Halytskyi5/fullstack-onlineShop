import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDownPanelComponent } from './slide-down-panel.component';

describe('SlideDownPanelComponent', () => {
  let component: SlideDownPanelComponent;
  let fixture: ComponentFixture<SlideDownPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideDownPanelComponent]
    });
    fixture = TestBed.createComponent(SlideDownPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
