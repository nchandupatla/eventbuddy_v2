import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../configs/app-config';
import { TranslateProvider } from '../providers/translate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translateService: TranslateService,
    translateProvider: TranslateProvider,
    storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

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
}
