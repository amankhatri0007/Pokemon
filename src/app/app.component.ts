import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { BackgroundColorOptions, StatusBar } from '@capacitor/status-bar';
import { Capacitor} from '@capacitor/core';
import { NotificationService } from './service/notification.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private notification:NotificationService,
    private logger:NGXLogger
  ) {
    this.appExitIfRequired();
    this.designStatusBar();
    this.configurePushNotification();
  }

  //App Exit with Hardware Back Button
  appExitIfRequired(){
    this.platform.backButton.subscribeWithPriority(-1, () => {
      const currentUrl = this.router.url;
      if (currentUrl === "/home" || currentUrl === "") {
        this.logger.info("Exit");
        App.exitApp();
      }
    });
  }

  //Style status bar
  designStatusBar(){
    if(Capacitor.getPlatform() !='web'){
      StatusBar.setOverlaysWebView({ overlay: false });
      const color:BackgroundColorOptions = {
        color:'#009B77'
      } 
      StatusBar.setBackgroundColor(color);
    }
  }

  //Configure Notifications
  configurePushNotification= async()=>{
    if(Capacitor.getPlatform() !='web'){
      this.logger.info("Running on Mobile Device");
      try {
        await this.notification.registerNotifications();
        await this.notification.addListeners();  
      } catch (error) {
        this.logger.error(error);
      }
    }else{
      this.logger.info("Running on Web");
    }
  }
}
