import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { generateId } from 'src/app/Helpers/helpers';
import { NotificationModel } from 'src/app/Models/notification-model';
import { WebNotificationService } from 'src/app/Services/web-notification.service';

@Component({
  selector: 'app-web-notification',
  templateUrl: './web-notification.component.html',
  styleUrls: ['./web-notification.component.scss']
})
export class WebNotificationComponent  implements OnDestroy{

    notification:any = new NotificationModel()
    notifications: Array<NotificationModel> =  []
    subscribe$= new Subscription()

    constructor(
        private notificationService: WebNotificationService
    ) {}

    ngOnInit() {
        this.subscribe$ = this.notificationService.notification$.subscribe({
            next: (notification: NotificationModel) => {
                
                if(notification?.message) {
                    notification.id = generateId()
                    this.notifications.push(notification)
                    const timeout: any = notification.timeout
                    // console.log(notification)
                    setTimeout(() => {
                        this.notification = this.notifications.filter((notif: NotificationModel) => notif.id !== notification.id)
                    }, timeout)
                }
                
            }
        })
    }

    ngOnDestroy(): void {
        this.subscribe$.unsubscribe()
    }

    closeNotif(id: string) {
        this.notification = this.notifications.filter((notif: NotificationModel) => notif.id !== id)
    }

}
