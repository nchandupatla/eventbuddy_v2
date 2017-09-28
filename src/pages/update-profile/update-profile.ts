import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider, NetworkProvider, DatabaseProvider, LoadingProvider, StorageProvider, AlertProvider, TranslateProvider, UsersApi } from '../../providers';
import { User } from '../../models/user';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  private user: User;
  private subscription: Subscription;
  private profileForm: FormGroup;
  private nameValidator: ValidatorFn = Validators.compose([
    Validators.required
  ]);
  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  private phoneValidator: ValidatorFn = Validators.compose([
    Validators.required,
  ]);
  private profilePic: string;
  private loaded: boolean;

  private defaultImg: string = 'assets/images/profile.png';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private network: NetworkProvider,
    private database: DatabaseProvider,
    private loading: LoadingProvider,
    private storage: StorageProvider,
    private alert: AlertProvider,
    private translate: TranslateProvider,
    private usersApi: UsersApi,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', this.nameValidator],
      lastName: ['', this.nameValidator],
      email: ['', this.emailValidator],
      phone:['', this.phoneValidator]
    });
    this.profileForm.get('email').disable();
  }

  ionViewDidLoad() {
    this.auth.getUser().then((user: firebase.User) => {
      if (!this.subscription) {
        //Subscribe to changes made to the user.
        this.subscription = this.usersApi.subscriptions.get(user.uid).subscribe((user: User) => {
          this.user = user;
          this.profilePic = user.profilePic;
          //Set values to form.
          this.profileForm.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone:this.user.phone
          });
        });
      }

      this.user = this.usersApi.getCurrentUser();
      this.profilePic = this.user.profilePic;
      //Set values to form.
      this.profileForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
       phone:this.user.phone
      });
    });
  }

  ionViewWillLeave() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.keyboard.close();
      if (this.profileForm.valid)
        this.updateProfile();
    }
  }

  private back(): void {
    if (this.user.profilePic != this.defaultImg && this.profilePic == this.defaultImg) {
      this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
        this.user.profilePic = this.defaultImg;
      });
    } else if (this.user.profilePic == this.defaultImg && this.profilePic != this.defaultImg) {
      this.user.profilePic = this.profilePic;
    }
    this.navCtrl.pop();
  }

  private updateProfile(): void {
    this.loading.show();
    this.user.firstName = this.profileForm.value['firstName'];
    this.user.lastName = this.profileForm.value['lastName'];
    this.database.setUser(this.user).then(() => {
      this.loading.hide();
      this.profilePic = this.user.profilePic;
      this.alert.showAlert(this.translate.get('PROFILE_UPDATED'), this.translate.get('PROFILE_UPDATED_MESSAGE'), this.translate.get('OK')).then(() => { });
    }).catch((error) => {
    });
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
              if (this.user.profilePic != this.profilePic) {
                this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
                  this.user.profilePic = profilePic;
                });
              } else {
                this.user.profilePic = profilePic;
              }
            });
          }
        },
        {
          text: this.translate.get('CHOOSE_FROM_GALLERY'),
          handler: () => {
            this.storage.uploadProfilePic(this.user.userId, this.camera.PictureSourceType.PHOTOLIBRARY).then(profilePic => {
              if (this.user.profilePic != this.profilePic) {
                this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
                  this.user.profilePic = profilePic;
                });
              } else {
                this.user.profilePic = profilePic;
              }
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

  private removeProfilePic(): void {
    if (this.profilePic == this.defaultImg) {
      this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(() => {
        this.user.profilePic = this.profilePic;
      });
    } else {
      this.user.profilePic = this.defaultImg;
    }
  }

}
