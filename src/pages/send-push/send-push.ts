import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { AlertProvider, AuthProvider, DatabaseProvider, NetworkProvider, NotificationProvider, LoadingProvider, ToastProvider, TranslateProvider, UsersApi } from '../../providers';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { ToastConfig } from '../../configs/toast-config';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-send-push',
  templateUrl: 'send-push.html'
})
export class SendPushPage {
  private usersLoaded: boolean;
  private users: User[];
  private user: User;
  private usersSubscription: Subscription;
  private userSubscription: Subscription;
  private excludedIds: string[];

  private imageLoadedMap: Map<string, boolean>;
  constructor(private platform: Platform,
    public navCtrl: NavController,
    private alert: AlertProvider,
    private auth: AuthProvider,
    private network: NetworkProvider,
    private notification: NotificationProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private translate: TranslateProvider,
    private usersApi: UsersApi) {
    this.imageLoadedMap = new Map<string, boolean>();
  }

  ionViewDidLoad() {
    this.auth.getUser().then((user: firebase.User) => {
      //Subscribe to changes made to users list.
      this.usersSubscription = this.usersApi.usersSubscription.subscribe((users: User[]) => {
        this.users = users;
        //Set excludedIds so the current user will not show up on the list.
        this.setExcludedIds();
      });

      //Subscribe to changes made to the user.
      this.userSubscription = this.usersApi.subscriptions.get(user.uid).subscribe((user: User) => {
        this.user = user;
      });

      this.users = this.usersApi.getUsers();
      this.user = this.usersApi.getCurrentUser();
      this.setExcludedIds();
    });
  }

  //Exclude current user from the list.
  private setExcludedIds(): void {
    if (this.user)
      this.excludedIds = [this.user.userId];
  }

  ionViewWillLeave() {
    if (this.usersSubscription)
      this.usersSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  private sendPushNotification(deviceToken: string): void {
    this.loading.show();
    let title = 'Jetpush';
    let message = this.user.firstName + ' ' + this.user.lastName + ' ' + this.translate.get('HAS_SENT_PUSH_NOTIFICATION') + '.';
    this.notification.sendPushNotification(deviceToken, title, message).then(() => {
      this.loading.hide();
      this.toast.showWithDuration(this.translate.get('PUSH_NOTIFICATION_SENT'), ToastConfig.duration);
    }).catch((error) => {
      this.loading.hide();
      this.toast.showWithDuration(this.translate.get('PUSH_NOTIFICATION_ERROR'), ToastConfig.duration);
      console.error("Error: " + JSON.stringify(error));
    });
  }
}
