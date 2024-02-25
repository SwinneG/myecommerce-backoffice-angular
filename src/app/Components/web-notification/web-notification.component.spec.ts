import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebNotificationComponent } from './web-notification.component';

describe('WebNotificationComponent', () => {
  let component: WebNotificationComponent;
  let fixture: ComponentFixture<WebNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebNotificationComponent]
    });
    fixture = TestBed.createComponent(WebNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
