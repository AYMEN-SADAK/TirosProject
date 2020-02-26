import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseurListComponent } from './poseur-list.component';

describe('PoseurListComponent', () => {
  let component: PoseurListComponent;
  let fixture: ComponentFixture<PoseurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoseurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoseurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
