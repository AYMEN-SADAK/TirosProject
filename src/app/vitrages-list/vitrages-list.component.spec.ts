import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitragesListComponent } from './vitrages-list.component';

describe('VitragesListComponent', () => {
  let component: VitragesListComponent;
  let fixture: ComponentFixture<VitragesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitragesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
