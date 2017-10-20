webpackJsonp([3],{

/***/ 1041:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationPageModule", function() { return VerificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__verification__ = __webpack_require__(1052);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var VerificationPageModule = (function () {
    function VerificationPageModule() {
    }
    return VerificationPageModule;
}());
VerificationPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__verification__["a" /* VerificationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__verification__["a" /* VerificationPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__verification__["a" /* VerificationPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__verification__["a" /* VerificationPage */]
        ]
    })
], VerificationPageModule);

//# sourceMappingURL=verification.module.js.map

/***/ }),

/***/ 1052:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_toast_config__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VerificationPage = (function () {
    function VerificationPage(navCtrl, navParams, auth, toast, network, loading, alert, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.toast = toast;
        this.network = network;
        this.loading = loading;
        this.alert = alert;
        this.translate = translate;
        this.subscription = this.network.subscription.subscribe(function (connected) {
            //Check if verification email is not sent for the first time and resend it when the user goes online.
            //It might not be sent successfully when the view is loaded and an internet connection is not available.
            if (connected && !_this.emailSent) {
                var self = _this;
                setTimeout(function () {
                    self.sendEmailVerification();
                }, 1000);
            }
        });
    }
    VerificationPage.prototype.ionViewDidLoad = function () {
        this.sendEmailVerification();
        var self = this;
        //Create an interval every second to check if the user has already verified their email.
        var interval = window.setInterval(function () {
            if (self.user) {
                self.user.reload();
                //User already verified their email, proceed to CompleteProfilePage.
                if (self.user.emailVerified) {
                    window.clearInterval(interval);
                    self.subscription.unsubscribe();
                    self.alert.showAlert(self.translate.get('EMAIL_VERIFIED'), self.translate.get('VERIFIED_MESSAGE'), self.translate.get('OK')).then(function () {
                        if (self.user.providerData[0].providerId != 'twitter.com')
                            self.navCtrl.setRoot('CompleteProfilePage');
                        else
                            self.navCtrl.setRoot('HomePage');
                    });
                }
            }
        }, 1000);
    };
    //Send verification email to user authenticated on Firebase.
    VerificationPage.prototype.sendEmailVerification = function () {
        var _this = this;
        this.loading.show();
        this.auth.getUser().then(function (user) {
            _this.user = user;
            if (_this.user) {
                _this.user.sendEmailVerification().then(function () {
                    _this.emailSent = true;
                    _this.loading.hide();
                    _this.toast.showWithDuration(_this.translate.get('VERIFICATION_SENT'), __WEBPACK_IMPORTED_MODULE_3__configs_toast_config__["a" /* ToastConfig */].duration);
                }).catch(function (error) {
                    _this.loading.hide();
                    _this.toast.showWithDuration(_this.translate.get('VERIFICATION_FAILED'), __WEBPACK_IMPORTED_MODULE_3__configs_toast_config__["a" /* ToastConfig */].duration);
                });
            }
        });
    };
    return VerificationPage;
}());
VerificationPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-verification',template:/*ion-inline-start:"/Users/rashgirl/workspace/eventbuddy_v2/src/pages/verification/verification.html"*/'<ion-content class="no-scroll">\n  <div text-center>\n    <img src="assets/images/logo.png"/>\n    <p>{{ \'THANK_YOU_REGISTERING\' | translate }}</p>\n    <p *ngIf="emailSent">{{ \'EMAIL_CONFIRMATION_SENT\' | translate }} <span *ngIf="user">{{user.email}}</span></p>\n    <p *ngIf="!emailSent">{{ \'EMAIL_CONFIRMATION_SENT_ONCE_ONLINE\' | translate }}</p>\n    <p>{{ \'ONCE_VERIFIED\' | translate }}</p>\n    <button ion-button icon-left color="robust" [disabled]="!network.online()" (click)="sendEmailVerification()">\n      <ion-icon name="md-mail"></ion-icon>\n      {{ \'RESEND_VERIFICATION\' | translate }}\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/rashgirl/workspace/eventbuddy_v2/src/pages/verification/verification.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["g" /* AlertProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["j" /* TranslateProvider */]])
], VerificationPage);

//# sourceMappingURL=verification.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map