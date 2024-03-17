import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { generateId } from 'src/app/backoffice/Helpers/helpers';
import { NotificationModel } from 'src/app/shared/Models/notification-model';
import { WebNotificationService } from 'src/app/backoffice/Services/web-notification.service';

@Component({
  selector: 'app-web-notification',
  templateUrl: './web-notification.component.html',
  styleUrls: ['./web-notification.component.scss']
})
export class WebNotificationComponent  implements OnDestroy{

    notifications : Array<NotificationModel> = []

    subscribe$ = new Subscription();

    constructor(
        private notificationService : WebNotificationService
    ) {}

    ngOnInit() {
       this.subscribe$ = this.notificationService.notification$.subscribe({
            next: (notification: NotificationModel) => {
                if(notification?.message) {
                    notification.id = generateId()
                    this.notifications.push(notification)
                    const timeout: any = notification.timeout
                    setTimeout(() => {
                        this.notifications = this.notifications.filter((notif: NotificationModel) => notif.id !== notification.id)
                    }, 5000)
                }
            }
       })
    }

    ngOnDestroy(): void {
        this.subscribe$.unsubscribe()
    }

    closeNotif(id: string) {
        this.notifications = this.notifications.filter((notif: NotificationModel) => notif.id !== id)
    }

   

}
