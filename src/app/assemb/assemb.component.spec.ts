import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembComponent } from './assemb.component';

describe('AssembComponent', () => {
  let component: AssembComponent;
  let fixture: ComponentFixture<AssembComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssembComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
