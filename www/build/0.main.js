webpackJsonp([0],{

/***/ 1038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPushPageModule", function() { return SendPushPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__send_push__ = __webpack_require__(1049);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__ = __webpack_require__(1053);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SendPushPageModule = (function () {
    function SendPushPageModule() {
    }
    return SendPushPageModule;
}());
SendPushPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__send_push__["a" /* SendPushPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__send_push__["a" /* SendPushPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild(),
            __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__send_push__["a" /* SendPushPage */]
        ]
    })
], SendPushPageModule);

//# sourceMappingURL=send-push.module.js.map

/***/ }),

/***/ 1049:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendPushPage; });
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




var SendPushPage = (function () {
    function SendPushPage(platform, navCtrl, alert, auth, network, notification, loading, toast, translate, usersApi) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.alert = alert;
        this.auth = auth;
        this.network = network;
        this.notification = notification;
        this.loading = loading;
        this.toast = toast;
        this.translate = translate;
        this.usersApi = usersApi;
        this.imageLoadedMap = new Map();
    }
    SendPushPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.auth.getUser().then(function (user) {
            //Subscribe to changes made to users list.
            _this.usersSubscription = _this.usersApi.usersSubscription.subscribe(function (users) {
                _this.users = users;
                //Set excludedIds so the current user will not show up on the list.
                _this.setExcludedIds();
            });
            //Subscribe to changes made to the user.
            _this.userSubscription = _this.usersApi.subscriptions.get(user.uid).subscribe(function (user) {
                _this.user = user;
            });
            _this.users = _this.usersApi.getUsers();
            _this.user = _this.usersApi.getCurrentUser();
            _this.setExcludedIds();
        });
    };
    //Exclude current user from the list.
    SendPushPage.prototype.setExcludedIds = function () {
        if (this.user)
            this.excludedIds = [this.user.userId];
    };
    SendPushPage.prototype.ionViewWillLeave = function () {
        if (this.usersSubscription)
            this.usersSubscription.unsubscribe();
        if (this.userSubscription)
            this.userSubscription.unsubscribe();
    };
    SendPushPage.prototype.sendPushNotification = function (deviceToken) {
        var _this = this;
        this.loading.show();
        var title = 'Jetpush';
        var message = this.user.firstName + ' ' + this.user.lastName + ' ' + this.translate.get('HAS_SENT_PUSH_NOTIFICATION') + '.';
        this.notification.sendPushNotification(deviceToken, title, message).then(function () {
            _this.loading.hide();
            _this.toast.showWithDuration(_this.translate.get('PUSH_NOTIFICATION_SENT'), __WEBPACK_IMPORTED_MODULE_3__configs_toast_config__["a" /* ToastConfig */].duration);
        }).catch(function (error) {
            _this.loading.hide();
            _this.toast.showWithDuration(_this.translate.get('PUSH_NOTIFICATION_ERROR'), __WEBPACK_IMPORTED_MODULE_3__configs_toast_config__["a" /* ToastConfig */].duration);
            console.error("Error: " + JSON.stringify(error));
        });
    };
    return SendPushPage;
}());
SendPushPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-send-push',template:/*ion-inline-start:"/Users/rashgirl/workspace/eventbuddy_v2/src/pages/send-push/send-push.html"*/'<ion-header color="primary">\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="navCtrl.pop()">{{ \'BACK\' | translate }}</button>\n    </ion-buttons>\n    <ion-title>{{ \'SEND_PUSH_NOTIFICATION\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let user of users | usersFilter: excludedIds">\n      <ion-thumbnail item-left>\n        <img src="{{user.profilePic}}" (load)="imageLoadedMap.set(user.userId, true);" [ngClass]="{\'img-loaded\':imageLoadedMap.get(user.userId)}" [hidden]="!imageLoadedMap.get(user.userId)">\n        <!-- Loading indicator when photo is not yet loaded. -->\n        <ion-spinner name="circles" [ngClass]="{\'center\':true}" *ngIf="!imageLoadedMap.get(user.userId)"></ion-spinner>\n      </ion-thumbnail>\n      <h2>{{user.firstName}} {{user.lastName}}</h2>\n      <p>Push: <b *ngIf="user.pushToken != \'\'">{{ \'AVAILABLE\' | translate }}</b> <b *ngIf="user.pushToken == \'\'">{{ \'NOT_AVAILABLE\' | translate }}</b></p>\n      <button ion-button clear item-right *ngIf="user.pushToken != \'\'" [disabled]="!network.online()"><ion-icon name="md-notifications" (click)="sendPushNotification(user.pushToken)"></ion-icon></button>\n      <button ion-button clear item-right *ngIf="user.pushToken == \'\'" disabled><ion-icon name="md-notifications-off"></ion-icon></button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/rashgirl/workspace/eventbuddy_v2/src/pages/send-push/send-push.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["g" /* AlertProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["b" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["c" /* NotificationProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["f" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["j" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["k" /* UsersApi */]])
], SendPushPage);

//# sourceMappingURL=send-push.js.map

/***/ }),

/***/ 1053:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(1054);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__users__["a" /* UsersPipe */],
        ],
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__users__["a" /* UsersPipe */],
        ]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 1054:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UsersPipe = (function () {
    function UsersPipe() {
    }
    UsersPipe.prototype.transform = function (users, excludedIds) {
        if (!users) {
            return;
        }
        else if (!excludedIds) {
            return users;
        }
        else if (excludedIds) {
            return users.filter(function (user) { return excludedIds.indexOf(user.userId) == -1; });
        }
    };
    return UsersPipe;
}());
UsersPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Pipe */])({
        name: 'usersFilter',
        pure: false
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Injectable */])()
], UsersPipe);

//# sourceMappingURL=users.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map