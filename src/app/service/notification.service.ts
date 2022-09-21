import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import { NGXLogger } from 'ngx-logger';
import { Util } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private util: Util,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logger:NGXLogger
  ) { }

  //Add all required listner for FCM Notification
  addListeners = async () => {
    try {
      //callback trigger when device register on firebase console
      await PushNotifications.addListener('registration', token => {
        this.logger.info('Registration token: ', token.value);
      });

      //callback trigger when device is failed to regsitered
      await PushNotifications.addListener('registrationError', err => {
        this.logger.error('Registration error: ', err.error);
      });

      //callback trigger when app received push notification when it is in foreground
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        this.logger.info('Push notification received: ', notification);
      });

      //callback trigger when user tap the notification on notification trey
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        this.logger.info('Push notification action performed', notification.actionId, notification.inputValue);
        this.logger.info("Data Received from FCM: ", notification);
        this.util.set(notification['notification']['data']);
        this.router.navigate(['/home/detail'], { relativeTo: this.activatedRoute });
      });
    } catch (error) {
      throw new Error('Failed to add Notification Listners');
    }

  }

  //Register for push notification
  registerNotifications = async () => {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
      await PushNotifications.register(); 
    } catch (error) {
      throw new Error('Failed to register push notification');
    }
  }
}
