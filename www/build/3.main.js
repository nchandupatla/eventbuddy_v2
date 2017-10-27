webpackJsonp([3],{

/***/ 1041:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateProfilePageModule", function() { return UpdateProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__update_profile__ = __webpack_require__(1053);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UpdateProfilePageModule = (function () {
    function UpdateProfilePageModule() {
    }
    return UpdateProfilePageModule;
}());
UpdateProfilePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__update_profile__["a" /* UpdateProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__update_profile__["a" /* UpdateProfilePage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__update_profile__["a" /* UpdateProfilePage */]
        ]
    })
], UpdateProfilePageModule);

//# sourceMappingURL=update-profile.module.js.map

/***/ }),

/***/ 1053:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UpdateProfilePage = (function () {
    function UpdateProfilePage(navCtrl, navParams, auth, network, database, loading, storage, alert, translate, usersApi, formBuilder, keyboard, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.network = network;
        this.database = database;
        this.loading = loading;
        this.storage = storage;
        this.alert = alert;
        this.translate = translate;
        this.usersApi = usersApi;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nameValidator = __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required
        ]);
        this.emailValidator = __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].email
        ]);
        this.phoneValidator = __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required,
        ]);
        this.defaultImg = 'assets/images/profile.png';
        this.profileForm = this.formBuilder.group({
            firstName: ['', this.nameValidator],
            lastName: ['', this.nameValidator],
            email: ['', this.emailValidator],
            phone: ['', this.phoneValidator]
        });
        this.profileForm.get('email').disable();
    }
    UpdateProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.auth.getUser().then(function (user) {
            if (!_this.subscription) {
                //Subscribe to changes made to the user.
                _this.subscription = _this.usersApi.subscriptions.get(user.uid).subscribe(function (user) {
                    _this.user = user;
                    _this.profilePic = user.profilePic;
                    //Set values to form.
                    _this.profileForm.setValue({
                        firstName: _this.user.firstName,
                        lastName: _this.user.lastName,
                        email: _this.user.email,
                        phone: _this.user.phone
                    });
                });
            }
            _this.user = _this.usersApi.getCurrentUser();
            _this.profilePic = _this.user.profilePic;
            //Set values to form.
            _this.profileForm.setValue({
                firstName: _this.user.firstName,
                lastName: _this.user.lastName,
                email: _this.user.email,
                phone: _this.user.phone
            });
        });
    };
    UpdateProfilePage.prototype.ionViewWillLeave = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    UpdateProfilePage.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            this.keyboard.close();
            if (this.profileForm.valid)
                this.updateProfile();
        }
    };
    UpdateProfilePage.prototype.back = function () {
        var _this = this;
        if (this.user.profilePic != this.defaultImg && this.profilePic == this.defaultImg) {
            this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(function () {
                _this.user.profilePic = _this.defaultImg;
            });
        }
        else if (this.user.profilePic == this.defaultImg && this.profilePic != this.defaultImg) {
            this.user.profilePic = this.profilePic;
        }
        this.navCtrl.pop();
    };
    UpdateProfilePage.prototype.updateProfile = function () {
        var _this = this;
        this.loading.show();
        this.user.firstName = this.profileForm.value['firstName'];
        this.user.lastName = this.profileForm.value['lastName'];
        this.database.setUser(this.user).then(function () {
            _this.loading.hide();
            _this.profilePic = _this.user.profilePic;
            _this.alert.showAlert(_this.translate.get('PROFILE_UPDATED'), _this.translate.get('PROFILE_UPDATED_MESSAGE'), _this.translate.get('OK')).then(function () { });
        }).catch(function (error) {
        });
    };
    UpdateProfilePage.prototype.setProfilePic = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            title: this.translate.get('SET_PROFILE_PICTURE'),
            buttons: [
                {
                    text: this.translate.get('TAKE_A_PHOTO'),
                    role: 'destructive',
                    handler: function () {
                        _this.storage.uploadProfilePic(_this.user.userId, _this.camera.PictureSourceType.CAMERA).then(function (profilePic) {
                            if (_this.user.profilePic != _this.profilePic) {
                                _this.storage.deleteProfilePic(_this.user.userId, _this.user.profilePic).then(function () {
                                    _this.user.profilePic = profilePic;
                                });
                            }
                            else {
                                _this.user.profilePic = profilePic;
                            }
                        });
                    }
                },
                {
                    text: this.translate.get('CHOOSE_FROM_GALLERY'),
                    handler: function () {
                        _this.storage.uploadProfilePic(_this.user.userId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (profilePic) {
                            if (_this.user.profilePic != _this.profilePic) {
                                _this.storage.deleteProfilePic(_this.user.userId, _this.user.profilePic).then(function () {
                                    _this.user.profilePic = profilePic;
                                });
                            }
                            else {
                                _this.user.profilePic = profilePic;
                            }
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
    UpdateProfilePage.prototype.removeProfilePic = function () {
        var _this = this;
        if (this.profilePic == this.defaultImg) {
            this.storage.deleteProfilePic(this.user.userId, this.user.profilePic).then(function () {
                _this.user.profilePic = _this.profilePic;
            });
        }
        else {
            this.user.profilePic = this.defaultImg;
        }
    };
    return UpdateProfilePage;
}());
UpdateProfilePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-update-profile',template:/*ion-inline-start:"C:\workspace\eventbuddy_v3\src\pages\update-profile\update-profile.html"*/'<ion-header color="primary">\n\n  <ion-navbar hideBackButton="true">\n\n    <ion-buttons>\n\n      <button ion-button tappable (click)="back()">{{ \'BACK\' | translate }}</button>\n\n    </ion-buttons>\n\n    <ion-title>{{ \'UPDATE_PROFILE\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-tabs>\n\n  <!-- Indicates with tabsPage should handle each tab here -->\n\n  <ion-tab [root]="tab3Root" tabTitle="Tab 3" tabIcon="cog"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Tab 2" tabIcon="chatbubbles"></ion-tab>\n\n  <ion-tab [root]="tab1Root" tabTitle="Tab 1" tabIcon="pulse"></ion-tab>\n\n</ion-tabs>\n\n<ion-content text-center>\n\n  <form [formGroup]="profileForm" (keydown)="keyDownFunction($event)">\n\n    <div id="avatar" *ngIf="user">\n\n      <button ion-fab mini color="dark" (click)="removeProfilePic()" *ngIf="user.profilePic != defaultImg && loaded"><ion-icon name="md-close"></ion-icon></button>\n\n      <img src="{{user.profilePic}}" *ngIf="network.online()" margin-bottom (click)="setProfilePic()" (load)="loaded = true;" [ngClass]="{\'img-loaded\':loaded}" [hidden]="!loaded">\n\n      <img src="{{user.profilePic}}" *ngIf="!network.online()" margin-bottom style="opacity: 0.6" (load)="loaded = true;" [ngClass]="{\'img-loaded\':loaded}" [hidden]="!loaded">\n\n      <!-- Loading indicator when photo is not yet loaded. -->\n\n      <ion-spinner name="circles" [ngClass]="{\'center\':true}" *ngIf="!loaded"></ion-spinner>\n\n    </div>\n\n    <ion-list no-margin no-padding>\n\n      <ion-item no-lines>\n\n        <ion-input type="text" formControlName="firstName" placeholder="{{ \'ENTER_FIRST_NAME\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.firstName.hasError(\'required\') && profileForm.controls.firstName.touched">{{ \'PLEASE_ENTER_FIRST_NAME\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.firstName.valid && !profileForm.controls.firstName.hasError(\'required\') && profileForm.controls.firstName.touched">{{ \'PLEASE_ENTER_FIRST_NAME\' | translate }}</p>\n\n      <ion-item no-lines>\n\n        <ion-input type="text" formControlName="lastName" placeholder="{{ \'ENTER_LAST_NAME\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.lastName.hasError(\'required\') && profileForm.controls.lastName.touched">{{ \'PLEASE_ENTER_LAST_NAME\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.lastName.valid && !profileForm.controls.lastName.hasError(\'required\') && profileForm.controls.lastName.touched">{{ \'PLEASE_ENTER_LAST_NAME\' | translate }}</p>\n\n      <ion-item no-lines>\n\n        <ion-input type="email" formControlName="email" placeholder="{{ \'ENTER_EMAIL\' | translate }}"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.email.hasError(\'required\') && profileForm.controls.email.touched">{{ \'PLEASE_ENTER_EMAIL\' | translate }}</p>\n\n      <p *ngIf="!profileForm.controls.email.valid && !profileForm.controls.email.hasError(\'required\') && profileForm.controls.email.touched">{{ \'PLEASE_ENTER_VALID_EMAIL\' | translate }}</p>\n\n     \n\n      <ion-item no-lines>\n\n        <ion-input type="phone" formControlName="phone" placeholder="Phone Number"></ion-input>\n\n      </ion-item>\n\n      <p *ngIf="profileForm.controls.phone.hasError(\'required\') && profileForm.controls.phone.touched">Please Enter Phone Number</p>\n\n      <p *ngIf="!profileForm.controls.phone.valid && !profileForm.controls.phone.hasError(\'required\') && profileForm.controls.phone.touched">Please Enter Phone Number</p>\n\n\n\n     \n\n      <button ion-button icon-left color="robust" (click)="updateProfile()" no-margin no-padding margin-top [disabled]="!network.online() || !profileForm.valid">\n\n        <ion-icon name="md-checkmark-circle"></ion-icon>{{ \'UPDATE_PROFILE\' | translate }}\n\n      </button>\n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\workspace\eventbuddy_v3\src\pages\update-profile\update-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["i" /* StorageProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["g" /* AlertProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["j" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["k" /* UsersApi */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ActionSheetController */]])
], UpdateProfilePage);

//# sourceMappingURL=update-profile.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map