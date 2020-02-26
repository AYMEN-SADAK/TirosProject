import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PVviewComponent } from './pvview.component';

describe('PVviewComponent', () => {
  let component: PVviewComponent;
  let fixture: ComponentFixture<PVviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PVviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PVviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
