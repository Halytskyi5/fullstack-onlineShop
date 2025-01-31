import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBrandComponent } from './about-brand.component';

describe('AboutBrandComponent', () => {
  let component: AboutBrandComponent;
  let fixture: ComponentFixture<AboutBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutBrandComponent]
    });
    fixture = TestBed.createComponent(AboutBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
