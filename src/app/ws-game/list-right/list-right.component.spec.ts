import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRightComponent } from './list-right.component';

describe('ListRightComponent', () => {
  let component: ListRightComponent;
  let fixture: ComponentFixture<ListRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
