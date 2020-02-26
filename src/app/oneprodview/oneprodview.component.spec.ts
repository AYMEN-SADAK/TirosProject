import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneprodviewComponent } from './oneprodview.component';

describe('OneprodviewComponent', () => {
  let component: OneprodviewComponent;
  let fixture: ComponentFixture<OneprodviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneprodviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneprodviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
