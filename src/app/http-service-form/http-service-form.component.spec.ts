import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpServiceFormComponent } from './http-service-form.component';

describe('HttpServiceFormComponent', () => {
  let component: HttpServiceFormComponent;
  let fixture: ComponentFixture<HttpServiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpServiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
