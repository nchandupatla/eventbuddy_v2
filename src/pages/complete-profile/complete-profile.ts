import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider, NetworkProvider, DatabaseProvider, LoadingProvider, StorageProvider, ToastProvider, TranslateProvider } from '../../providers';
import { User } from '../../models/user';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { AuthConfig } from '../../configs/auth-config';

@IonicPage()
@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage {
  private user: User;
  private profileForm: FormGroup;
  private provider: string;
  private nameValidator: ValidatorFn = Validators.compose([
    Validators.required
  ]);
  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  private phoneValidator: ValidatorFn = Validators.compose([
    Validators.required
  ]);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private network: NetworkProvider,
    private database: DatabaseProvider,
    private loading: LoadingProvider,
    private storage: StorageProvider,
    private toast: ToastProvider,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', this.nameValidator],
      lastName: ['', this.nameValidator],
      email: ['', this.emailValidator],
      phone: ['', this.phoneValidator]
    });
    let isTwitter = this.navParams.get('isTwitter');
    if (!isTwitter) {
      this.provider = '';
      this.profileForm.get('email').disable();
    } else {
      this.provider = 'twitter.com';
      this.profileForm.get('email').enable();
    }
  }

  ionViewWillLeave() {
    this.database.exists('users/' + this.user.userId).then(exists => {
      if (!exists) {
        this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
        });
      }
    });
  }

  ionViewDidLoad() {
    this.auth.getUser().then((user: firebase.User) => {
      let userId, firstName, lastName, profilePic, email, phone;

      userId = user.uid;

      let providerData = user.providerData[0];
      if (providerData) {
        if (providerData.displayName) {
          if (providerData.displayName.indexOf(' ') > -1) {
            firstName = providerData.displayName.substr(0, providerData.displayName.indexOf(' '));
            lastName = providerData.displayName.substr(providerData.displayName.indexOf(' ') + 1, providerData.displayName.length);
          }
        } else {
          firstName = providerData.displayName;
          lastName = '';
        }
        email = providerData.email;
        phone=providerData.phoneNumber;
        if (providerData.photoURL) {
          profilePic = providerData.photoURL;
        } else {
          profilePic = 'assets/images/profile.png';
        }
      } else {
        if (user.displayName) {
          if (user.displayName.indexOf(' ') > -1) {
            firstName = user.displayName.substr(0, user.displayName.indexOf(' '));
            lastName = user.displayName.substr(user.displayName.indexOf(' ') + 1, user.displayName.length);
          }
        } else {
          firstName = user.displayName;
          lastName = '';
        }
        email = user.email;
        phone=user.phoneNumber;
        if (user.photoURL) {
          profilePic = user.photoURL;
        } else {
          profilePic = 'assets/images/profile.png';
        }
      }
      //Create user object based on User model.
      this.user = new User(userId, firstName, lastName, profilePic, email, phone, '');

      this.profileForm.setValue({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone:phone
      });
    });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.keyboard.close();
      if (this.profileForm.valid)
        this.completeProfile();
    }
  }

  private completeProfile(): void {
    this.loading.show();
    this.user.firstName = this.profileForm.value['firstName'];
    this.user.lastName = this.profileForm.value['lastName'];
    this.user.phone = this.profileForm.value['phone'];
    if (this.provider == 'twitter.com') {
      this.auth.getTwitterCredential().then(credential => {
        this.auth.getUser().then((user: firebase.User) => {
          user.reauthenticateWithCredential(credential).then(() => {
            user.updateEmail(this.profileForm.value['email']).then(res => {
              this.user.email = this.profileForm.value['email'];
              this.database.setUser(this.user).then(() => {
                this.loading.hide();
                if (AuthConfig.emailVerification) {
                  this.navCtrl.setRoot('VerificationPage');
                } else {
                  this.navCtrl.setRoot('HomePage');
                }
              }).catch((error) => {
              });
            }).catch(err => {
              let error: any = err;
              this.toast.showError(error.code);
              this.loading.hide();
            });
          });
        });
      });
    } else {
      this.database.setUser(this.user).then(() => {
        this.loading.hide();
        this.navCtrl.setRoot('HomePage');
      }).catch((error) => {
      });
    }
  }

  private setProfilePic(): void {
    this.actionSheetCtrl.create({
      title: this.translate.get('SET_PROFILE_PICTURE'),
      buttons: [
        {
          text: this.translate.get('TAKE_A_PHOTO'),
          role: 'destructive',
          handler: () => {
            this.storage.uploadProfilePic(this.user.userId, this.camera.PictureSourceType.CAMERA).then(profilePic => {
              this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
                this.user.profilePic = profilePic;
              });
            });
          }
        },
        {
          text: this.translate.get('CHOOSE_FROM_GALLERY'),
          handler: () => {
            this.storage.uploadProfilePic(this.user.userId, this.camera.PictureSourceType.PHOTOLIBRARY).then(profilePic => {
              this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
                this.user.profilePic = profilePic;
              });
            });
          }
        },
        {
          text: this.translate.get('CANCEL'),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();
  }

}
