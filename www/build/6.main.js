webpackJsonp([6],{

/***/ 1034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__(1042);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]
        ]
    })
], HomePageModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 1042:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_auth_config__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(platform, navCtrl, alertCtrl, alert, auth, database, network, notification, translate, loading, usersApi, storage) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.alert = alert;
        this.auth = auth;
        this.database = database;
        this.network = network;
        this.notification = notification;
        this.translate = translate;
        this.loading = loading;
        this.usersApi = usersApi;
        this.storage = storage;
    }
    HomePage.prototype.ionViewWillLeave = function () {
        this.loading.hide();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.loaded = false;
            _this.storage.get('language').then(function (language) {
                _this.language = language;
            });
            // Show IntroPage, you can configure to show the intro once or always when the app loads.
            _this.storage.get('introShown').then(function (result) {
                //Intro is not yet shown.
                if (!result) {
                    _this.storage.set('introShown', true);
                    _this.navCtrl.setRoot('IntroPage');
                }
                else {
                    _this.auth.getUser().then(function (user) {
                        if (user) {
                            var provider = user.providerData[0].providerId;
                            var isTwitter_1 = provider == 'twitter.com';
                            if (__WEBPACK_IMPORTED_MODULE_3__configs_auth_config__["a" /* AuthConfig */].emailVerification) {
                                if (!user.emailVerified) {
                                    if (isTwitter_1) {
                                        _this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter_1 });
                                    }
                                    else {
                                        _this.navCtrl.setRoot('VerificationPage');
                                    }
                                }
                                else {
                                    _this.database.exists('users/' + user.uid).then(function (exists) {
                                        if (!exists) {
                                            _this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter_1 });
                                        }
                                        else {
                                            _this.notification.init();
                                            if (_this.usersApi.loaded) {
                                                _this.loaded = true;
                                            }
                                            else {
                                                _this.usersApi.init().then(function () {
                                                    _this.loaded = true;
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                            else {
                                _this.database.exists('users/' + user.uid).then(function (exists) {
                                    if (!exists) {
                                        _this.navCtrl.setRoot('CompleteProfilePage', { isTwitter: isTwitter_1 });
                                    }
                                    else {
                                        _this.notification.init();
                                        if (_this.usersApi.loaded) {
                                            _this.loaded = true;
                                        }
                                        else {
                                            _this.usersApi.init().then(function () {
                                                _this.loaded = true;
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        else {
                            _this.navCtrl.setRoot('LoginPage');
                        }
                    });
                }
            });
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.alert.showConfirm(this.translate.get('CONFIRM_LOGOUT'), this.translate.get('LOGOUT_QUESTION'), this.translate.get('CANCEL'), this.translate.get('LOGOUT')).then(function (confirm) {
            if (confirm) {
                _this.loading.show();
                _this.notification.destroy().then(function () {
                    _this.auth.logout().then(function () {
                        _this.loading.hide();
                        _this.navCtrl.setRoot('LoginPage');
                    });
                });
            }
        });
    };
    HomePage.prototype.setLanguage = function () {
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
    return HomePage;
}());
HomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\workspace\event-buddyv1\src\pages\home\home.html"*/'<ion-content>\n  <ion-fab top left *ngIf="loaded">\n    <img src="assets/images/en.png" tappable (click)="setLanguage()" *ngIf="language == \'en\'">\n    <img src="assets/images/es.png" tappable (click)="setLanguage()" *ngIf="language == \'es\'">\n  </ion-fab>\n  <div class="top" text-center>\n    <img src="assets/images/logo.png">\n  </div>\n  <div class="bottom" text-center *ngIf="loaded">\n    <button ion-button icon-left color="sandy" [disabled]="!network.online()" (click)="setLanguage()">\n      <ion-icon name="md-settings"></ion-icon>\n      {{ \'SET_LANGUAGE\' | translate }}\n    </button>\n    <button ion-button icon-left color="robust" [disabled]="!network.online()" (click)="navCtrl.push(\'UpdateProfilePage\')">\n      <ion-icon name="md-clipboard"></ion-icon>\n      {{ \'UPDATE_PROFILE\' | translate }}\n    </button>\n    <button ion-button icon-left color="coral" [disabled]="!network.online()" (click)="navCtrl.push(\'SendPushPage\')">\n      <ion-icon name="md-mail"></ion-icon>\n      {{ \'SEND_PUSH_NOTIFICATION\' | translate }}\n    </button>\n    <button ion-button icon-left color="skyblue" [disabled]="!network.online()" (click)="logout()">\n      <ion-icon name="md-exit"></ion-icon>\n      {{ \'LOGOUT\' | translate }}\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\workspace\event-buddyv1\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["g" /* AlertProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["h" /* DatabaseProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* NotificationProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["j" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["k" /* UsersApi */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map