import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsGameComponent } from './ws-game.component';

describe('WsGameComponent', () => {
  let component: WsGameComponent;
  let fixture: ComponentFixture<WsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
