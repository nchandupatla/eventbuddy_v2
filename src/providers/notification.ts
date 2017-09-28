import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { DatabaseProvider } from './database';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../configs/app-config';
import * as firebase from 'firebase';

@Injectable()
export class NotificationProvider {
  constructor(private platform: Platform,
    private push: Push,
    private database: DatabaseProvider,
    private http: Http) {
  }

  public init(): void {
    console.log("Initializing Notification Provider");
    if (this.platform.is('cordova')) {
      this.push.register().then((token: PushToken) => {
        console.log('Generated Token' + JSON.stringify(token));
        return this.push.saveToken(token);
      }).then((token: PushToken) => {
        console.log('Token Saved', token);
        this.database.setPushToken(firebase.auth().currentUser.uid, token.token);
      }).catch((error) => {
        console.log('Error Saving Token: ', error);
      });
    }
  }

  public destroy(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.database.removePushToken(firebase.auth().currentUser.uid);
        this.push.unregister().then(() => {
          resolve();
        }).catch(error => {
          reject();
        });
      } else {
        reject();
      }
    });
  }

  public sendPushNotification(deviceToken: string, title: string, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let postParams = {
        tokens: [deviceToken],
        profile: AppConfig.pushProfile,
        notification: {
          title: title,
          message: message
        }
      }
      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + AppConfig.apiToken);
      let options = new RequestOptions({ headers: headers });
      this.http.post('https://api.ionic.io/push/notifications', postParams, options).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }
}
