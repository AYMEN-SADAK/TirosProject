import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitreurListComponent } from './vitreur-list.component';

describe('VitreurListComponent', () => {
  let component: VitreurListComponent;
  let fixture: ComponentFixture<VitreurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitreurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitreurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
