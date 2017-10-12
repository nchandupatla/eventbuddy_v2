import { Component, ViewChild  } from '@angular/core';
import { App, Platform, MenuController, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../configs/app-config';
import { TranslateProvider } from '../providers/translate';
import { UsersApi, AuthProvider, AlertProvider, LoadingProvider, NotificationProvider } from '../providers';
import { User } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';
  usersApi:any;
  user: User;
  userEmail:string;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translateService: TranslateService,
    private translateProvider: TranslateProvider,
    usersApi: UsersApi,
    private auth: AuthProvider,
    private menuCtrl: MenuController,
    storage: Storage,
    private alert: AlertProvider,
    private loading: LoadingProvider,
    private notification: NotificationProvider,
    private appCtrl: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl=menuCtrl;
      this.auth.getUser().then((user: firebase.User) => {
        if(user){
          this.userEmail=user.email;
          this.menuCtrl.swipeEnable(true);
        }else{
          this.menuCtrl.swipeEnable(false);
        }
      })

      storage.get('language').then(language => {
        if (language) {
          // Set language.
          translateService.setDefaultLang(language);
          translateService.use(language);
          translateService.getTranslation(language).subscribe(translations => {
            translateProvider.setTranslations(translations);
          });
        } else {
          // Set default language.
          translateService.setDefaultLang(AppConfig.defaultLanguage);
          translateService.use(AppConfig.defaultLanguage);
          storage.set('language', AppConfig.defaultLanguage);
          translateService.getTranslation(AppConfig.defaultLanguage).subscribe(translations => {
            translateProvider.setTranslations(translations);
          });
        }
      }).catch(error => {
      });
    });
  }

  ionViewDidLoad() {
    
  }

  private logout(): void {
    this.alert.showConfirm(this.translateProvider.get('CONFIRM_LOGOUT'), this.translateProvider.get('LOGOUT_QUESTION'), this.translateProvider.get('CANCEL'), this.translateProvider.get('LOGOUT')).then(confirm => {
      if (confirm) {
        this.loading.show();
        this.notification.destroy().then(() => {
          this.auth.logout().then(() => {
            this.loading.hide();
            this.appCtrl.getRootNav().setRoot('LoginPage');
          });
        });
      }
    });
  }

  navPush(view){
    this.appCtrl.getRootNav().push(view);
    this.menuCtrl.close;
  }
}
