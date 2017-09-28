import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CloudModule } from '@ionic/cloud-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//Config
import { AuthConfig } from '../configs/auth-config';
import { AppConfig } from '../configs/app-config';
//Providers
import {
  AlertProvider,
  AnimationProvider,
  AuthProvider,
  DatabaseProvider,
  LoadingProvider,
  NetworkProvider,
  NotificationProvider,
  ToastProvider,
  StorageProvider,
  TranslateProvider,
  UsersApi
} from '../providers';

import { MyApp } from './app.component';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, AppConfig.config),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(AuthConfig.firebaseConfig),
    CloudModule.forRoot(AppConfig.cloudConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    //Providers
    AuthProvider,
    NetworkProvider,
    NotificationProvider,
    ToastProvider,
    AnimationProvider,
    LoadingProvider,
    AlertProvider,
    DatabaseProvider,
    StorageProvider,
    TranslateProvider,
    UsersApi,
    //Native
    StatusBar,
    SplashScreen,
    Keyboard,
    Network,
    Facebook,
    GooglePlus,
    TwitterConnect,
    Camera,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
