import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AVviewComponent } from './avview.component';

describe('AVviewComponent', () => {
  let component: AVviewComponent;
  let fixture: ComponentFixture<AVviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AVviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AVviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
