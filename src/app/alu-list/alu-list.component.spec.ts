import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluListComponent } from './alu-list.component';

describe('AluListComponent', () => {
  let component: AluListComponent;
  let fixture: ComponentFixture<AluListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
