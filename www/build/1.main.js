webpackJsonp([1],{

/***/ 1033:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleteProfileModule", function() { return CompleteProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__complete_profile__ = __webpack_require__(1045);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CompleteProfileModule = (function () {
    function CompleteProfileModule() {
    }
    return CompleteProfileModule;
}());
CompleteProfileModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__complete_profile__["a" /* CompleteProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__complete_profile__["a" /* CompleteProfilePage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__complete_profile__["a" /* CompleteProfilePage */]
        ]
    })
], CompleteProfileModule);

//# sourceMappingURL=complete-profile.module.js.map

/***/ }),

/***/ 1043:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(userId, firstName, lastName, profilePic, email, phone, pushToken) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePic = profilePic;
        this.email = email;
        this.phone = phone;
        this.pushToken = pushToken;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 1045:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(1043);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configs_auth_config__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CompleteProfilePage = (function () {
    function CompleteProfilePage(navCtrl, navParams, auth, network, database, loading, storage, toast, translate, formBuilder, keyboard, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.network = network;
        this.database = database;
        this.loading = loading;
        this.storage = storage;
        this.toast = toast;
        this.translate = translate;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nameValidator = __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required
        ]);
        this.emailValidator = __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].email
        ]);
        this.phoneValidator = __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required
        ]);
        this.profileForm = this.formBuilder.group({
            firstName: ['', this.nameValidator],
            lastName: ['', this.nameValidator],
            email: ['', this.emailValidator],
            phone: ['', this.phoneValidator]
        });
        var isTwitter = this.navParams.get('isTwitter');
        if (!isTwitter) {
            this.provider = '';
            this.profileForm.get('email').disable();
        }
        else {
            this.provider = 'twitter.com';
            this.profileForm.get('email').enable();
        }
    }
    CompleteProfilePage.prototype.ionViewWillLeave = function () {
        var _this = this;
        this.database.exists('users/' + this.user.userId).then(function (exists) {
            if (!exists) {
                _this.storage.deleteProfilePic(_this.user.userId, _this.user.profilePic).then(function () {
                });
            }
        });
    };
    CompleteProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.auth.getUser().then(function (user) {
            var userId, firstName, lastName, profilePic, email, phone;
            userId = user.uid;
            var providerData = user.providerData[0];
            if (providerData) {
                if (providerData.displayName) {
                    if (providerData.displayName.indexOf(' ') > -1) {
                        firstName = providerData.displayName.substr(0, providerData.displayName.indexOf(' '));
                        lastName = providerData.displayName.substr(providerData.displayName.indexOf(' ') + 1, providerData.displayName.length);
                    }
                }
                else {
                    firstName = providerData.displayName;
                    lastName = '';
                }
                email = providerData.email;
                phone = providerData.phoneNumber;
                if (providerData.photoURL) {
                    profilePic = providerData.photoURL;
                }
                else {
                    profilePic = 'assets/images/profile.png';
                }
            }
            else {
                if (user.displayName) {
                    if (user.displayName.indexOf(' ') > -1) {
                        firstName = user.displayName.substr(0, user.displayName.indexOf(' '));
                        lastName = user.displayName.substr(user.displayName.indexOf(' ') + 1, user.displayName.length);
                    }
                }
                else {
                    firstName = user.displayName;
                    lastName = '';
                }
                email = user.email;
                phone = user.phoneNumber;
                if (user.photoURL) {
                    profilePic = user.photoURL;
                }
                else {
                    profilePic = 'assets/images/profile.png';
                }
            }
            //Create user object based on User model.
            _this.user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */](userId, firstName, lastName, profilePic, email, phone, '');
            _this.profileForm.setValue({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            });
        });
    };
    CompleteProfilePage.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            this.keyboard.close();
            if (this.profileForm.valid)
                this.completeProfile();
        }
    };
    CompleteProfilePage.prototype.completeProfile = function () {
        var _this = this;
        this.loading.show();
        this.user.firstName = this.profileForm.value['firstName'];
        this.user.lastName = this.profileForm.value['lastName'];
        this.user.phone = this.profileForm.value['phone'];
        if (this.provider == 'twitter.com') {
            this.auth.getTwitterCredential().then(function (credential) {
                _this.auth.getUser().then(function (user) {
                    user.reauthenticateWithCredential(credential).then(function () {
                        user.updateEmail(_this.profileForm.value['email']).then(function (res) {
                            _this.user.email = _this.profileForm.value['email'];
                            _this.database.setUser(_this.user).then(function () {
                                _this.loading.hide();
                                if (__WEBPACK_IMPORTED_MODULE_7__configs_auth_config__["a" /* AuthConfig */].emailVerification) {
                                    _this.navCtrl.setRoot('VerificationPage');
                                }
                                else {
                                    _this.navCtrl.setRoot('HomePage');
                                }
                            }).catch(function (error) {
                            });
                        }).catch(function (err) {
                            var error = err;
                            _this.toast.showError(error.code);
                            _this.loading.hide();
                        });
                    });
                });
            });
        }
        else {
            this.database.setUser(this.user).then(function () {
                _this.loading.hide();
                _this.navCtrl.setRoot('HomePage');
            }).catch(function (error) {
            });
        }
    };
    CompleteProfilePage.prototype.setProfilePic = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            title: this.translate.get('SET_PROFILE_PICTURE'),
            buttons: [
                {
                    text: this.translate.get('TAKE_A_PHOTO'),
                    role: 'destructive',
                    handler: function () {
                        _this.storage.uploadProfilePic(_this.user.userId, _this.camera.PictureSourceType.CAMERA).then(function (profilePic) {
                            _this.storage.deleteProfilePic(_this.user.userId, _this.user.profilePic).then(function () {
                                _this.user.profilePic = profilePic;
                            });
                        });
                    }
                },
                {
                    text: this.translate.get('CHOOSE_FROM_GALLERY'),
                    handler: function () {
                        _this.storage.uploadProfilePic(_this.user.userId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (profilePic) {
                            _this.storage.deleteProfilePic(_this.user.userId, _this.user.profilePic).then(function () {
                                _this.user.profilePic = profilePic;
                            });
                        });
                    }
                },
                {
                    text: this.translate.get('CANCEL'),
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        }).present();
    };
    return CompleteProfilePage;
}());
CompleteProfilePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-complete-profile',template:/*ion-inline-start:"C:\workspace\eventbuddy_v3\src\pages\complete-profile\complete-profile.html"*/'<ion-content text-center>\n\n  <form [formGroup]="profileForm" (keydown)="keyDownFunction($event)">\n\n    <img src="{{user.profilePic || \'assets/images/profile.png\'}}" *ngIf="user && network.online()" margin-bottom (click)="setProfilePic()">\n\n    <img src="{{user.profilePic || \'assets/images/profile.png\'}}" *ngIf="user && !network.online()" margin-bottom style="opacity: 0.6">\n\n    <ion-list no-margin no-padding>\n\n      <ion-item no-lines>\n\n        <ion-input type="text" formControlName="firstName" placeholder="{{ \'ENTER_FIRST_NAME\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.firstName.hasError(\'required\') && profileForm.controls.firstName.touched">{{ \'PLEASE_ENTER_FIRST_NAME\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.firstName.valid && !profileForm.controls.firstName.hasError(\'required\') && profileForm.controls.firstName.touched">{{ \'PLEASE_ENTER_FIRST_NAME\' | translate }}</p>\n\n      <ion-item no-lines>\n\n        <ion-input type="text" formControlName="lastName" placeholder="{{ \'ENTER_LAST_NAME\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.lastName.hasError(\'required\') && profileForm.controls.lastName.touched">{{ \'PLEASE_ENTER_LAST_NAME\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.lastName.valid && !profileForm.controls.lastName.hasError(\'required\') && profileForm.controls.lastName.touched">{{ \'PLEASE_ENTER_LAST_NAME\' | translate }}</p>\n\n      <ion-item no-lines>\n\n        <ion-input type="email" formControlName="email" placeholder="{{ \'ENTER_EMAIL\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.email.hasError(\'required\') && profileForm.controls.email.touched">{{ \'PLEASE_ENTER_EMAIL\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.email.valid && !profileForm.controls.email.hasError(\'required\') && profileForm.controls.email.touched">{{ \'PLEASE_ENTER_VALID_EMAIL\' | translate }}</p>\n\n\n\n      <ion-item no-lines>\n\n        <ion-input type="phone" formControlName="phone" placeholder="Phone Number"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.phone.hasError(\'required\') && profileForm.controls.phone.touched">Please Enter Phone Number</p>\n\n      <p *ngIf="!profileForm.controls.phone.valid && !profileForm.controls.phone.hasError(\'required\') && profileForm.controls.phone.touched">Please Enter Phone Number</p>\n\n\n\n\n\n      <button ion-button icon-left color="robust" (click)="completeProfile()" no-margin no-padding margin-top [disabled]="!network.online() || !profileForm.valid">\n\n        <ion-icon name="md-checkmark-circle"></ion-icon>{{ \'COMPLETE_PROFILE\' | translate }}\n\n      </button>\n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\workspace\eventbuddy_v3\src\pages\complete-profile\complete-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["i" /* StorageProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["j" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ActionSheetController */]])
], CompleteProfilePage);

//# sourceMappingURL=complete-profile.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map