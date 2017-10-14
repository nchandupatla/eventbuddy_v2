import { Component } from '@angular/core';
import { Platform, IonicPage, MenuController ,NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthConfig } from '../../configs/auth-config';
import { AlertProvider, AuthProvider, DatabaseProvider, NetworkProvider, NotificationProvider, LoadingProvider, TranslateProvider, UsersApi } from '../../providers';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loaded: boolean;
  private language: string;
  tab1:any;
  private groupList:any;

  constructor(private platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private alert: AlertProvider,
    private auth: AuthProvider,
    private database: DatabaseProvider,
    private network: NetworkProvider,
    private notification: NotificationProvider,
    private translate: TranslateProvider,
    private loading: LoadingProvider,
    private usersApi: UsersApi,
    private storage: Storage,
    public menuCtrl: MenuController) {
     // this.tab1 = HomePage;
     this.database.getGroups().subscribe((groups: any) => {
       this.groupList=groups;
     });

  }

  ionViewWillLeave() {
    this.loading.hide();
  }

  navToDetails(group){
    console.log('grp id '+JSON.stringify(group));
    this.navCtrl.push('GroupDetailsPage',{'id': group.$key})
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.loaded = false;
      // Show IntroPage, you can configure to show the intro once or always when the app loads.
      this.storage.get('introShown').then(result => {
        //Intro is not yet shown.
        if (!result) {
          this.storage.set('introShown', true);
          this.navCtrl.setRoot('IntroPage');
        } else {
          this.auth.getUser().then((user: firebase.User) => {
            if (user) {
              let provider = user.providerData[0].providerId;
              let isTwitter = provider == 'twitter.com';
              if (AuthConfig.emailVerification) {
                if (!user.emailVerified) {
                  if (isTwitter) {
                    this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter });
                  } else {
                    this.navCtrl.setRoot('VerificationPage');
                  }
                } else {
                  this.database.exists('users/' + user.uid).then(exists => {
                    if (!exists) {
                      this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter });
                    } else {
                      this.notification.init();
                      if (this.usersApi.loaded) {
                        this.loaded = true;
                      } else {
                        this.usersApi.init().then(() => {
                          this.loaded = true;
                        });
                      }
                    }
                  });
                }
              } else {
                this.database.exists('users/' + user.uid).then(exists => {
                  if (!exists) {
                    this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter });
                  } else {
                    this.notification.init();
                    if (this.usersApi.loaded) {
                      this.loaded = true;
                    } else {
                      this.usersApi.init().then(() => {
                        this.loaded = true;
                      });
                    }
                  }
                });
              }
            } else {
              this.navCtrl.setRoot('LoginPage');
            }
          });
        }
      });
    });
  }

  private logout(): void {
    this.alert.showConfirm(this.translate.get('CONFIRM_LOGOUT'), this.translate.get('LOGOUT_QUESTION'), this.translate.get('CANCEL'), this.translate.get('LOGOUT')).then(confirm => {
      if (confirm) {
        this.loading.show();
        this.notification.destroy().then(() => {
          this.auth.logout().then(() => {
            this.loading.hide();
            this.navCtrl.setRoot('LoginPage');
          });
        });
      }
    });
  }

  private setLanguage(): void {
    let language;
    this.storage.get('language').then(language => {
      language = language;
      let alert = this.alertCtrl.create();
      alert.setTitle(this.translate.get('SET_LANGUAGE'));
      alert.addInput({
        type: 'radio',
        label: this.translate.get('ENGLISH'),
        value: 'en',
        checked: language == 'en'
      });
      alert.addInput({
        type: 'radio',
        label: this.translate.get('SPANISH'),
        value: 'es',
        checked: language == 'es'
      });
      alert.addButton(this.translate.get('CANCEL'));
      alert.addButton({
        text: this.translate.get('OK'),
        handler: data => {
          this.storage.set('language', data).then(() => {
            window.location.reload();
          });
        }
      });
      alert.present();
    });
  }
}
