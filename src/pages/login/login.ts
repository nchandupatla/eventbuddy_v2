import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider, LoadingProvider, NetworkProvider, ToastProvider, DatabaseProvider, TranslateProvider } from '../../providers';
import { AuthConfig } from '../../configs/auth-config';
import { ToastConfig } from '../../configs/toast-config';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private language: string;
  private mode: string;
  private loginForm: FormGroup;
  private signupForm: FormGroup;
  private resetForm: FormGroup;
  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  private passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private network: NetworkProvider,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private database: DatabaseProvider,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private storage: Storage) {


  this.storage.set('introShown', true);//Reached login=>IntoPage shown already.
 // this.navCtrl.setRoot('HomePage');
 
    this.loginForm = formBuilder.group({
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator]
    });

    this.signupForm = formBuilder.group({
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator],
      confirmPassword: ['', this.passwordValidator]
    });

    this.resetForm = formBuilder.group({
      email: ['', this.emailValidator]
    });

    this.platform.ready().then(() => {
      this.keyboard.disableScroll(false);
      this.keyboard.hideKeyboardAccessoryBar(true);
    });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.keyboard.close();
      if (this.mode == 'login') {
        if (this.loginForm.valid)
          this.loginWithEmail();
      } else if (this.mode == 'signup') {
        if (this.signupForm.valid)
          this.signup();
      }
    }
  }

  ionViewWillEnter() {
    this.storage.get('language').then(language => {
      this.language = language;
    });

    this.auth.getUser().then((user: firebase.User) => {
      if (user) {
        
        if (AuthConfig.emailVerification) {
          if (!user.emailVerified) {
            this.navCtrl.setRoot('VerificationPage');
          } else {
            this.navCtrl.setRoot('TabsPage');
          }
        } else {
          this.navCtrl.setRoot('TabsPage');
        }
      }
    });
  }

  ionViewDidLoad() {
    this.mode = 'home';
  }

  private goToIntro(): void {
    this.navCtrl.setRoot('IntroPage');
  }

  private loginWithFacebook(): void {
    this.loading.show();
    this.auth.loginWithFacebook().then(res => {
      this.loading.hide();
      this.navCtrl.setRoot('TabsPage');
    }).catch(err => {
      if (err)
        this.toast.showWithDuration(this.translate.get('LOGIN_FACEBOOK_ERROR'), ToastConfig.duration);
      this.loading.hide();
    });
  }

  private loginWithGoogle(): void {
    this.loading.show();
    this.auth.loginWithGoogle().then(res => {
      this.loading.hide();
      this.navCtrl.setRoot('TabsPage');
    }).catch(err => {
      if (err)
        this.toast.showWithDuration(this.translate.get('LOGIN_GOOGLE_ERROR'), ToastConfig.duration);
      this.loading.hide();
    });
  }

  private loginWithTwitter(): void {
    this.loading.show();
    this.auth.loginWithTwitter().then(res => {
      this.loading.hide();
      //Check if user already exists, if not go to CompleteProfile
      this.database.exists('users/' + firebase.auth().currentUser.uid).then(exists => {
        if (!exists) {
          this.navCtrl.setRoot('CompleteProfilePage');
        } else {
          this.navCtrl.setRoot('TabsPage');
        }
      });
    }).catch(err => {
      if (err)
        this.toast.showWithDuration(this.translate.get('LOGIN_TWITTER_ERROR'), ToastConfig.duration);
      this.loading.hide();
    });
  }

  private loginWithEmail(): void {
    this.loading.show();
    this.auth.loginWithEmail(this.loginForm.value['email'], this.loginForm.value['password']).then(res => {
      this.loading.hide();
      this.navCtrl.setRoot('TabsPage');
    }).catch(err => {
      console.log(err.code);
      this.toast.showError(err.code);
      this.loading.hide();
    });
  }

  private signup(): void {
    this.loading.show();
    this.auth.createUserWithEmailAndPassword(this.signupForm.value['email'], this.signupForm.value['password']).then(res => {
      this.loading.hide();
      this.navCtrl.setRoot('TabsPage');
    }).catch(err => {
      console.log(err.code);
      this.toast.showError(err.code);
      this.loading.hide();
    });
  }

  private resetPassword(): void {
    this.loading.show();
    this.auth.sendPasswordResetEmail(this.resetForm.value['email']).then(res => {
      this.loading.hide();
      this.toast.showWithDuration(this.translate.get('PASSWORD_RESET_SENT'), ToastConfig.duration);
    }).catch(err => {
      console.log(err.code);
      this.toast.showError(err.code);
      this.loading.hide();
    });
  }

  private showHome(): void {
    let self = this;
    setTimeout(function() {
      self.mode = 'home';
    }, 0);
  }

  private showLogin(): void {
    let self = this;
    setTimeout(function() {
      self.mode = 'login';
    }, 0);
    this.loginForm.reset();
  }

  private showSignup(): void {
    let self = this;
    setTimeout(function() {
      self.mode = 'signup';
    }, 0);
    this.signupForm.reset();
  }

  private showReset(): void {
    let self = this;
    setTimeout(function() {
      self.mode = 'reset';
    }, 0);
    this.resetForm.reset();
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
