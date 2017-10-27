webpackJsonp([6],{

/***/ 1037:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__intro__ = __webpack_require__(1049);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var IntroPageModule = (function () {
    function IntroPageModule() {
    }
    return IntroPageModule;
}());
IntroPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__intro__["a" /* IntroPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__intro__["a" /* IntroPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__intro__["a" /* IntroPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__intro__["a" /* IntroPage */]
        ]
    })
], IntroPageModule);

//# sourceMappingURL=intro.module.js.map

/***/ }),

/***/ 1049:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_animation__ = __webpack_require__(605);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroPage = (function () {
    function IntroPage(navCtrl, navParams, animation, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.animation = animation;
        this.platform = platform;
    }
    IntroPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var self = _this;
            setTimeout(function () {
                self.animation.animate(document.getElementById('animate_1'), 'animateLaunchIn');
                self.animation.animate(document.getElementById('animate_2'), 'animateFadeInOut');
                self.animation.animate(document.getElementById('animate_3'), 'animateClockwise');
                self.animation.animate(document.getElementById('animate_4'), 'animateUpDown');
            }, 100);
        });
    };
    return IntroPage;
}());
IntroPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-intro',template:/*ion-inline-start:"C:\workspace\eventbuddy_v3\src\pages\intro\intro.html"*/'<ion-content class="no-scroll">\n\n  <ion-slides>\n\n    <ion-slide>\n\n      <div class="text top">\n\n        <h3>Welcome to Event Buddy</h3>\n\n        <p>Making group event managements easy</p>\n\n      </div>\n\n      <img id="animate_1" src="assets/images/groups.jpg" />\n\n      <div class="text bottom">\n\n        <span>{{ \'SWIPE_TO_CONTINUE\' | translate }}</span>\n\n      </div>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="text top">\n\n        <h3>{{ \'BEAUTIFULLY_CRAFTED\' | translate }}</h3>\n\n        <p>{{ \'QUALITY_TESTED\' | translate }}</p>\n\n      </div>\n\n      <img id="animate_2" src="assets/images/modern.png" />\n\n      <div class="text bottom">\n\n        <span>{{ \'SWIPE_TO_CONTINUE\' | translate }}</span>\n\n      </div>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="text top">\n\n        <h3>{{ \'LOTS_FEATURES\' | translate }}</h3>\n\n        <p>{{ \'JUMPSTART_MODERN\' | translate }}</p>\n\n      </div>\n\n      <img id="animate_3" src="assets/images/features.png" />\n\n      <div class="text bottom">\n\n        <span>{{ \'SWIPE_TO_CONTINUE\' | translate }}</span>\n\n      </div>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="text top">\n\n        <h3>Modern way to manage group events</h3>\n\n        <p>Launch it now! </p>\n\n      </div>\n\n      <img id="animate_4" src="assets/images/launch.png"/>\n\n      <div class="text bottom">\n\n        <span>{{ \'APP_APP_AWAY\' | translate }}</span>\n\n      </div>\n\n      <ion-fab top right>\n\n        <button ion-fab color="steel" (click)="navCtrl.setRoot(\'LoginPage\')"><ion-icon name="md-close"></ion-icon></button>\n\n      </ion-fab>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\workspace\eventbuddy_v3\src\pages\intro\intro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_animation__["a" /* AnimationProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
], IntroPage);

//# sourceMappingURL=intro.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map