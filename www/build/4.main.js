webpackJsonp([4],{

/***/ 1037:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(1047);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]
        ]
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 1047:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_auth_config__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_toast_config__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(241);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(platform, navCtrl, alertCtrl, navParams, network, auth, loading, toast, database, translate, formBuilder, keyboard, storage) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.network = network;
        this.auth = auth;
        this.loading = loading;
        this.toast = toast;
        this.database = database;
        this.translate = translate;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.storage = storage;
        this.emailValidator = __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].email
        ]);
        this.passwordValidator = __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* Validators */].minLength(4)
        ]);
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
        this.platform.ready().then(function () {
            _this.keyboard.disableScroll(false);
            _this.keyboard.hideKeyboardAccessoryBar(true);
        });
    }
    LoginPage.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            this.keyboard.close();
            if (this.mode == 'login') {
                if (this.loginForm.valid)
                    this.loginWithEmail();
            }
            else if (this.mode == 'signup') {
                if (this.signupForm.valid)
                    this.signup();
            }
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('language').then(function (language) {
            _this.language = language;
        });
        this.auth.getUser().then(function (user) {
            if (user) {
                if (__WEBPACK_IMPORTED_MODULE_3__configs_auth_config__["a" /* AuthConfig */].emailVerification) {
                    if (!user.emailVerified) {
                        _this.navCtrl.setRoot('VerificationPage');
                    }
                    else {
                        _this.navCtrl.setRoot('HomePage');
                    }
                }
                else {
                    _this.navCtrl.setRoot('HomePage');
                }
            }
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.mode = 'home';
    };
    LoginPage.prototype.goToIntro = function () {
        this.navCtrl.setRoot('IntroPage');
    };
    LoginPage.prototype.loginWithFacebook = function () {
        var _this = this;
        this.loading.show();
        this.auth.loginWithFacebook().then(function (res) {
            _this.loading.hide();
            _this.navCtrl.setRoot('HomePage');
        }).catch(function (err) {
            if (err)
                _this.toast.showWithDuration(_this.translate.get('LOGIN_FACEBOOK_ERROR'), __WEBPACK_IMPORTED_MODULE_4__configs_toast_config__["a" /* ToastConfig */].duration);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.loginWithGoogle = function () {
        var _this = this;
        this.loading.show();
        this.auth.loginWithGoogle().then(function (res) {
            _this.loading.hide();
            _this.navCtrl.setRoot('HomePage');
        }).catch(function (err) {
            if (err)
                _this.toast.showWithDuration(_this.translate.get('LOGIN_GOOGLE_ERROR'), __WEBPACK_IMPORTED_MODULE_4__configs_toast_config__["a" /* ToastConfig */].duration);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.loginWithTwitter = function () {
        var _this = this;
        this.loading.show();
        this.auth.loginWithTwitter().then(function (res) {
            _this.loading.hide();
            //Check if user already exists, if not go to CompleteProfile
            _this.database.exists('users/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid).then(function (exists) {
                if (!exists) {
                    _this.navCtrl.setRoot('CompleteProfilePage');
                }
                else {
                    _this.navCtrl.setRoot('HomePage');
                }
            });
        }).catch(function (err) {
            if (err)
                _this.toast.showWithDuration(_this.translate.get('LOGIN_TWITTER_ERROR'), __WEBPACK_IMPORTED_MODULE_4__configs_toast_config__["a" /* ToastConfig */].duration);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.loginWithEmail = function () {
        var _this = this;
        this.loading.show();
        this.auth.loginWithEmail(this.loginForm.value['email'], this.loginForm.value['password']).then(function (res) {
            _this.loading.hide();
            _this.navCtrl.setRoot('HomePage');
        }).catch(function (err) {
            console.log(err.code);
            _this.toast.showError(err.code);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.signup = function () {
        var _this = this;
        this.loading.show();
        this.auth.createUserWithEmailAndPassword(this.signupForm.value['email'], this.signupForm.value['password']).then(function (res) {
            _this.loading.hide();
            _this.navCtrl.setRoot('HomePage');
        }).catch(function (err) {
            console.log(err.code);
            _this.toast.showError(err.code);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.resetPassword = function () {
        var _this = this;
        this.loading.show();
        this.auth.sendPasswordResetEmail(this.resetForm.value['email']).then(function (res) {
            _this.loading.hide();
            _this.toast.showWithDuration(_this.translate.get('PASSWORD_RESET_SENT'), __WEBPACK_IMPORTED_MODULE_4__configs_toast_config__["a" /* ToastConfig */].duration);
        }).catch(function (err) {
            console.log(err.code);
            _this.toast.showError(err.code);
            _this.loading.hide();
        });
    };
    LoginPage.prototype.showHome = function () {
        var self = this;
        setTimeout(function () {
            self.mode = 'home';
        }, 0);
    };
    LoginPage.prototype.showLogin = function () {
        var self = this;
        setTimeout(function () {
            self.mode = 'login';
        }, 0);
        this.loginForm.reset();
    };
    LoginPage.prototype.showSignup = function () {
        var self = this;
        setTimeout(function () {
            self.mode = 'signup';
        }, 0);
        this.signupForm.reset();
    };
    LoginPage.prototype.showReset = function () {
        var self = this;
        setTimeout(function () {
            self.mode = 'reset';
        }, 0);
        this.resetForm.reset();
    };
    LoginPage.prototype.setLanguage = function () {
        var _this = this;
        var language;
        this.storage.get('language').then(function (language) {
            language = language;
            var alert = _this.alertCtrl.create();
            alert.setTitle(_this.translate.get('SET_LANGUAGE'));
            alert.addInput({
                type: 'radio',
                label: _this.translate.get('ENGLISH'),
                value: 'en',
                checked: language == 'en'
            });
            alert.addInput({
                type: 'radio',
                label: _this.translate.get('SPANISH'),
                value: 'es',
                checked: language == 'es'
            });
            alert.addButton(_this.translate.get('CANCEL'));
            alert.addButton({
                text: _this.translate.get('OK'),
                handler: function (data) {
                    _this.storage.set('language', data).then(function () {
                        window.location.reload();
                    });
                }
            });
            alert.present();
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\workspace\eventbuddy_v3\src\pages\login\login.html"*/'\n\n<ion-content >\n\n  <ion-fab top right *ngIf="mode == \'home\'">\n\n    <button ion-fab color="steel" (click)="goToIntro()"><ion-icon name="md-help"></ion-icon></button>\n\n  </ion-fab>\n\n  <ion-fab top right *ngIf="mode != \'home\'">\n\n    <button ion-fab color="steel" (click)="showHome()"><ion-icon name="md-close"></ion-icon></button>\n\n  </ion-fab>\n\n  <!-- <ion-fab top left>\n\n    <img src="assets/images/en.png" tappable (click)="setLanguage()" *ngIf="language == \'en\'">\n\n    <img src="assets/images/es.png" tappable (click)="setLanguage()" *ngIf="language == \'es\'">\n\n  </ion-fab> -->\n\n  <div class="top" text-center>\n\n    <img src="assets/images/groups.jpg">\n\n    <h3>Event Buddy</h3>\n\n  </div>\n\n  <div class="bottom" text-center>\n\n    <div *ngIf="mode == \'home\'">\n\n      <button ion-button icon-left color="sandy" [disabled]="!network.online()" (click)="loginWithFacebook()">\n\n        <ion-icon name="logo-facebook"></ion-icon>\n\n        {{ \'CONTINUE_WITH_FACEBOOK\' | translate }}\n\n      </button>\n\n      <button ion-button icon-left color="robust" [disabled]="!network.online()" (click)="loginWithGoogle()">\n\n        <ion-icon name="logo-google"></ion-icon>\n\n        {{ \'CONTINUE_WITH_GOOGLE\' | translate }}\n\n      </button>\n\n      <button ion-button icon-left color="skyblue" [disabled]="!network.online()" (click)="showSignup()">\n\n        <ion-icon name="md-mail-open"></ion-icon>\n\n        {{ \'SIGNUP_WITH_EMAIL\' | translate }}\n\n      </button>\n\n      <button ion-button clear color="steel" [disabled]="!network.online()" (click)="showLogin()">\n\n        {{ \'HAVE_ACCOUNT\' | translate }}\n\n      </button>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="bottom" *ngIf="mode == \'login\'" text-center>\n\n    <form [formGroup]="loginForm" (keydown)="keyDownFunction($event)">\n\n      <ion-list no-margin no-padding>\n\n        <ion-item no-lines>\n\n          <ion-input type="email" value="" formControlName="email" placeholder="{{ \'ENTER_EMAIL\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="loginForm.controls.email.hasError(\'required\') && loginForm.controls.email.touched">{{ \'PLEASE_ENTER_EMAIL\' | translate }}</p>\n\n        <p *ngIf="!loginForm.controls.email.valid && !loginForm.controls.email.hasError(\'required\') && loginForm.controls.email.touched">{{ \'PLEASE_ENTER_VALID_EMAIL\' | translate }}</p>\n\n\n\n        <ion-item no-lines>\n\n          <ion-input type="password" formControlName="password" placeholder="{{ \'ENTER_PASSWORD\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="loginForm.controls.password.hasError(\'required\') && loginForm.controls.password.touched">{{ \'PLEASE_ENTER_PASSWORD\' | translate }}</p>\n\n        <p *ngIf="!loginForm.controls.password.valid && !loginForm.controls.password.hasError(\'required\') && loginForm.controls.password.touched">{{ \'PASSWORD_INVALID\' | translate }}</p>\n\n      </ion-list>\n\n      <button ion-button clear color="steel" (click)="showReset()" [disabled]="!network.online()">\n\n        {{ \'FORGOT_PASSWORD\' | translate }}\n\n      </button>\n\n      <button ion-button icon-left color="robust" (click)="loginWithEmail()" [disabled]="!network.online() || !loginForm.valid"><ion-icon name="md-key"></ion-icon>{{ \'LOGIN_JETPACK\' | translate }}</button>\n\n      <button ion-button icon-left color="skyblue" (click)="loginWithFacebook()" class="half-width" [disabled]="!network.online()"><ion-icon name="logo-facebook"></ion-icon>Facebook</button>\n\n      <button ion-button icon-left color="coral" (click)="loginWithGoogle()" class="half-width" [disabled]="!network.online()"><ion-icon name="logo-google"></ion-icon>Google</button>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="bottom" *ngIf="mode == \'signup\'" text-center>\n\n    <form [formGroup]="signupForm" (keydown)="keyDownFunction($event)">\n\n      <ion-list no-margin no-padding>\n\n\n\n        <ion-item no-lines>\n\n          <ion-input type="email" formControlName="email" placeholder="{{ \'ENTER_EMAIL\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="signupForm.controls.email.hasError(\'required\') && signupForm.controls.email.touched">{{ \'PLEASE_ENTER_EMAIL\' | translate }}</p>\n\n        <p *ngIf="!signupForm.controls.email.valid && !signupForm.controls.email.hasError(\'required\') && signupForm.controls.email.touched">{{ \'PLEASE_ENTER_VALID_EMAIL\' | translate }}</p>\n\n\n\n        <ion-item no-lines>\n\n          <ion-input type="password" formControlName="password" placeholder="{{ \'ENTER_PASSWORD\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="signupForm.controls.password.hasError(\'required\') && signupForm.controls.password.touched">{{ \'PLEASE_ENTER_PASSWORD\' | translate }}</p>\n\n        <p *ngIf="!signupForm.controls.password.valid && !signupForm.controls.password.hasError(\'required\') && signupForm.controls.password.touched">{{ \'PASSWORD_INVALID\' | translate }}</p>\n\n\n\n        <ion-item no-lines>\n\n          <ion-input type="password" formControlName="confirmPassword" placeholder="{{ \'REENTER_PASSWORD\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="signupForm.controls.confirmPassword.hasError(\'required\') && signupForm.controls.confirmPassword.touched">{{ \'PLEASE_CONFIRM_PASSWORD\' | translate }}</p>\n\n        <p *ngIf="!signupForm.controls.confirmPassword.hasError(\'required\') && (signupForm.controls.password.touched && signupForm.controls.confirmPassword.touched) && signupForm.value[\'confirmPassword\'] != signupForm.value[\'password\']">{{ \'PASSWORD_DO_NOT_MATCH\' | translate }}</p>\n\n      </ion-list>\n\n      <button ion-button clear color="steel" (click)="showLogin()" [disabled]="!network.online()">\n\n        {{ \'HAVE_ACCOUNT\' | translate }}\n\n      </button>\n\n      <button ion-button icon-left color="robust" (click)="signup()" no-margin no-padding [disabled]="!network.online() || !signupForm.valid || (signupForm.value[\'confirmPassword\'] != signupForm.value[\'password\'])"><ion-icon name="md-log-in"></ion-icon>{{ \'JOIN_JETPACK\' | translate }}</button>\n\n      <p>{{ \'AGREE_TERMS_PRIVACY\' | translate }}</p>\n\n    </form>\n\n  </div>\n\n\n\n  <div class="bottom" *ngIf="mode == \'reset\'" text-center>\n\n    <form [formGroup]="resetForm" (keydown)="keyDownFunction($event)">\n\n      <p>{{ \'ENTER_EMAIL_RESET_PASSWORD\' | translate }}</p>\n\n      <ion-list no-margin no-padding>\n\n        <ion-item no-lines>\n\n          <ion-input type="email" value="" formControlName="email" placeholder="{{ \'ENTER_EMAIL\' | translate }}"></ion-input>\n\n        </ion-item>\n\n        <p *ngIf="resetForm.controls.email.hasError(\'required\') && resetForm.controls.email.touched">{{ \'PLEASE_ENTER_EMAIL\' | translate }}</p>\n\n        <p *ngIf="!resetForm.controls.email.valid && !resetForm.controls.email.hasError(\'required\') && resetForm.controls.email.touched">{{ \'PLEASE_ENTER_VALID_EMAIL\' | translate }}</p>\n\n      </ion-list>\n\n      <button ion-button clear color="steel" (click)="showLogin()" [disabled]="!network.online()">\n\n        {{ \'GOT_PASSWORD_LOGIN\' | translate }}\n\n      </button>\n\n      <button ion-button icon-left color="robust" (click)="resetPassword()" [disabled]="!network.online() || !resetForm.valid"><ion-icon name="md-refresh"></ion-icon>{{ \'RESET_PASSWORD\' | translate }}</button>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\workspace\eventbuddy_v3\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["j" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map