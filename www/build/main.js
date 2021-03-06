webpackJsonp([11],{

/***/ 1010:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toast__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__translate__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configs_toast_config__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StorageProvider = (function () {
    function StorageProvider(camera, file, loading, toast, translate) {
        this.camera = camera;
        this.file = file;
        this.loading = loading;
        this.toast = toast;
        this.translate = translate;
        console.log("Initializing Storage Provider");
        this.profilePicOptions = {
            quality: 25,
            targetWidth: 288,
            targetHeight: 288,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
            allowEdit: true
        };
    }
    StorageProvider.prototype.uriToBlob = function (fileURI) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.resolveLocalFilesystemUrl(fileURI).then(function (fileEntry) {
                fileEntry.getParent(function (directoryEntry) {
                    _this.file.readAsArrayBuffer(directoryEntry.nativeURL, fileEntry.name)
                        .then(function (data) {
                        var uint8Array = new Uint8Array(data);
                        var buffer = uint8Array.buffer;
                        var blob = new Blob([buffer]);
                        resolve(blob);
                    }).catch(function (error) {
                        console.error("Error creating File array buffer: " + JSON.stringify(error));
                        reject(error);
                    });
                });
            }).catch(function (error) {
                console.error("Error retrieving File URI: " + JSON.stringify(error));
                reject(error);
            });
        });
    };
    StorageProvider.prototype.deleteProfilePic = function (userId, url) {
        return new Promise(function (resolve) {
            var fileName = url.substring(url.lastIndexOf('%2F') + 3, url.lastIndexOf('?'));
            console.log(fileName);
            __WEBPACK_IMPORTED_MODULE_6_firebase__["storage"]().ref().child('images/' + userId + '/' + fileName).delete().then(function () {
                resolve();
            }).catch(function (error) {
                resolve();
            });
        });
    };
    StorageProvider.prototype.uploadProfilePic = function (userId, sourceType) {
        var _this = this;
        this.profilePicOptions.sourceType = sourceType;
        return new Promise(function (resolve) {
            _this.camera.getPicture(_this.profilePicOptions).then(function (fileURI) {
                _this.loading.show();
                var fileName = JSON.stringify(fileURI).substr(JSON.stringify(fileURI).lastIndexOf('/') + 1);
                fileName = fileName.substr(0, fileName.length - 1);
                console.log("File name: " + fileName);
                _this.uriToBlob(fileURI).then(function (fileBlob) {
                    var metadata = {
                        'contentType': fileBlob.type
                    };
                    __WEBPACK_IMPORTED_MODULE_6_firebase__["storage"]().ref().child('images/' + userId + '/' + fileName).put(fileBlob, metadata).then(function (snapshot) {
                        var fileURL = snapshot.metadata.downloadURLs[0];
                        _this.loading.hide();
                        resolve(fileURL);
                    }).catch(function (error) {
                        _this.loading.hide();
                        _this.toast.showWithDuration(_this.translate.get('UPLOAD_PICTURE_ERROR'), __WEBPACK_IMPORTED_MODULE_7__configs_toast_config__["a" /* ToastConfig */].duration);
                    });
                }).catch(function (error) {
                    _this.loading.hide();
                    _this.toast.showWithDuration(_this.translate.get('UPLOAD_PICTURE_ERROR'), __WEBPACK_IMPORTED_MODULE_7__configs_toast_config__["a" /* ToastConfig */].duration);
                });
            }).catch(function (error) {
                _this.loading.hide();
            });
        });
    };
    return StorageProvider;
}());
StorageProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_3__loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_4__toast__["a" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_5__translate__["a" /* TranslateProvider */]])
], StorageProvider);

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 1011:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersApi = (function () {
    function UsersApi(database, network, loading) {
        var _this = this;
        this.database = database;
        this.network = network;
        this.loading = loading;
        this.usersSubscription = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        console.log("Initializing UsersAPI");
        this.networkSubscription = this.network.subscription.subscribe(function (connected) {
            if (connected && !_this.loaded) {
                var self = _this;
                setTimeout(function () {
                    self.init();
                }, 1000);
            }
        });
        this.usersSubscription = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.usersIndexMap = new Map();
        this.subscriptionMap = new Map();
        this.subscriptions = new Map();
    }
    UsersApi.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
            else {
                _this.loading.show();
            }
            _this.subscription = _this.database.getUsers().subscribe(function (users) {
                _this.users = users;
                _this.usersSubscription.next(_this.users);
                var _loop_1 = function (i) {
                    var userId = _this.users[i].userId;
                    _this.usersIndexMap.set(userId, i);
                    if (!_this.subscriptionMap.get(userId)) {
                        _this.subscriptions.set(userId, new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]());
                        var subscription = _this.database.getUserById(userId).subscribe(function (user) {
                            _this.subscriptions.get(userId).next(user);
                        });
                        _this.subscriptionMap.set(userId, subscription);
                    }
                };
                for (var i = 0; i < _this.users.length; i++) {
                    _loop_1(i);
                }
                _this.loaded = true;
                _this.loading.hide();
                resolve();
            });
        });
    };
    UsersApi.prototype.getCurrentUser = function () {
        if (this.loaded)
            return this.users[this.usersIndexMap.get(__WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid)];
        else
            return null;
    };
    UsersApi.prototype.getUser = function (userId) {
        if (this.loaded)
            return this.users[this.usersIndexMap.get(userId)];
        else
            return null;
    };
    UsersApi.prototype.getUsers = function () {
        if (this.loaded)
            return this.users;
        else
            return null;
    };
    return UsersApi;
}());
UsersApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers__["d" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1__providers__["f" /* NetworkProvider */], __WEBPACK_IMPORTED_MODULE_1__providers__["e" /* LoadingProvider */]])
], UsersApi);

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 1012:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GroupsApi */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupsApi = (function () {
    function GroupsApi(database, network, loading) {
        var _this = this;
        this.database = database;
        this.network = network;
        this.loading = loading;
        this.groupsSubscription = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        console.log("Initializing groupsAPI");
        this.networkSubscription = this.network.subscription.subscribe(function (connected) {
            if (connected && !_this.loaded) {
                var self = _this;
                setTimeout(function () {
                    self.init();
                }, 1000);
            }
        });
        this.groupsSubscription = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.groupsIndexMap = new Map();
        this.subscriptionMap = new Map();
        this.subscriptions = new Map();
    }
    GroupsApi.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
            else {
                _this.loading.show();
            }
            _this.subscription = _this.database.getGroups().subscribe(function (groups) {
                _this.groups = groups;
                _this.groupsSubscription.next(_this.groups);
                var _loop_1 = function (i) {
                    var groupId = _this.groups[i].groupId;
                    _this.groupsIndexMap.set(groupId, i);
                    if (!_this.subscriptionMap.get(groupId)) {
                        _this.subscriptions.set(groupId, new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]());
                        var subscription = _this.database.getGroupById(groupId).subscribe(function (group) {
                            _this.subscriptions.get(groupId).next(group);
                        });
                        _this.subscriptionMap.set(groupId, subscription);
                    }
                };
                for (var i = 0; i < _this.groups.length; i++) {
                    _loop_1(i);
                }
                _this.loaded = true;
                _this.loading.hide();
                resolve();
            });
        });
    };
    GroupsApi.prototype.getGroup = function (groupId) {
        if (this.loaded)
            return this.groups[this.groupsIndexMap.get(groupId)];
        else
            return null;
    };
    GroupsApi.prototype.getGroups = function () {
        if (this.loaded)
            return this.groups;
        else
            return null;
    };
    return GroupsApi;
}());
GroupsApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers__["d" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1__providers__["f" /* NetworkProvider */], __WEBPACK_IMPORTED_MODULE_1__providers__["e" /* LoadingProvider */]])
], GroupsApi);

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ 1036:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__configs_app_config__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_translate__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, translateService, translateProvider, usersApi, auth, menuCtrl, storage, alert, loading, notification, appCtrl) {
        var _this = this;
        this.translateProvider = translateProvider;
        this.usersApi = usersApi;
        this.auth = auth;
        this.menuCtrl = menuCtrl;
        this.alert = alert;
        this.loading = loading;
        this.notification = notification;
        this.appCtrl = appCtrl;
        this.rootPage = undefined;
        storage.get('introShown').then(function (result) {
            //Intro is not yet shown.
            if (result) {
                storage.get('userLoggedIn').then(function (user) {
                    if (user) {
                        _this.rootPage = 'TabsPage';
                    }
                    else {
                        _this.rootPage = 'LoginPage';
                    }
                });
            }
            else {
                _this.rootPage = 'IntroPage';
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.menuCtrl = menuCtrl;
            console.log('fsdf ' + JSON.stringify(_this.usersApi.getCurrentUser()));
            _this.auth.getUser().then(function (user) {
                if (user) {
                    _this.userEmail = user.email;
                    _this.menuCtrl.swipeEnable(true);
                }
                else {
                    _this.menuCtrl.swipeEnable(false);
                }
            });
            storage.get('language').then(function (language) {
                if (language) {
                    // Set language.
                    translateService.setDefaultLang(language);
                    translateService.use(language);
                    translateService.getTranslation(language).subscribe(function (translations) {
                        translateProvider.setTranslations(translations);
                    });
                }
                else {
                    // Set default language.
                    translateService.setDefaultLang(__WEBPACK_IMPORTED_MODULE_6__configs_app_config__["a" /* AppConfig */].defaultLanguage);
                    translateService.use(__WEBPACK_IMPORTED_MODULE_6__configs_app_config__["a" /* AppConfig */].defaultLanguage);
                    storage.set('language', __WEBPACK_IMPORTED_MODULE_6__configs_app_config__["a" /* AppConfig */].defaultLanguage);
                    translateService.getTranslation(__WEBPACK_IMPORTED_MODULE_6__configs_app_config__["a" /* AppConfig */].defaultLanguage).subscribe(function (translations) {
                        translateProvider.setTranslations(translations);
                    });
                }
            }).catch(function (error) {
            });
        });
    }
    MyApp.prototype.ionViewDidLoad = function () {
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.alert.showConfirm(this.translateProvider.get('CONFIRM_LOGOUT'), this.translateProvider.get('LOGOUT_QUESTION'), this.translateProvider.get('CANCEL'), this.translateProvider.get('LOGOUT')).then(function (confirm) {
            if (confirm) {
                _this.loading.show();
                _this.notification.destroy().then(function () {
                    _this.auth.logout().then(function () {
                        _this.loading.hide();
                        _this.appCtrl.getRootNav().setRoot('LoginPage');
                    });
                });
            }
        });
    };
    MyApp.prototype.navPush = function (view) {
        this.appCtrl.getRootNav().push(view);
        this.menuCtrl.close;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\RAVI\WORK\Ionic\event_buddy_v2\eventbuddy_v2\src\app\app.html"*/'<ion-menu [content]="content" side="left">\n\n        <ion-header>\n\n          <ion-toolbar>\n\n            <ion-title>{{userEmail}}</ion-title>\n\n          </ion-toolbar>\n\n        </ion-header>\n\n        <ion-content>\n\n          <ion-list>\n\n            <button ion-item (click)="logout()" menuClose>\n\n              Logout\n\n            </button>\n\n            <button ion-item (click)="navPush(\'GroupSearchPage\')" menuClose>\n\n              Search\n\n            </button>\n\n          </ion-list>\n\n        </ion-content>\n\n      </ion-menu>\n\n\n\n     \n\n      \n\n      <ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\RAVI\WORK\Ionic\event_buddy_v2\eventbuddy_v2\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_7__providers_translate__["a" /* TranslateProvider */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["k" /* UsersApi */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["c" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["a" /* AlertProvider */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["e" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["g" /* NotificationProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configs_toast_config__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__translate__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ToastProvider = (function () {
    function ToastProvider(toastCtrl, translate) {
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        console.log("Initializing Toast Provider");
    }
    ToastProvider.prototype.show = function (message) {
        var _this = this;
        if (!this.toast) {
            var options = __WEBPACK_IMPORTED_MODULE_2__configs_toast_config__["a" /* ToastConfig */].options;
            this.toast = this.toastCtrl.create(options);
            this.toast.setMessage(message);
            this.toast.present();
            this.toast.onDidDismiss(function () {
                _this.toast = null;
            });
        }
    };
    ToastProvider.prototype.showWithDuration = function (message, duration) {
        var _this = this;
        if (!this.toast) {
            var options = __WEBPACK_IMPORTED_MODULE_2__configs_toast_config__["a" /* ToastConfig */].options;
            this.toast = this.toastCtrl.create(options);
            this.toast.setMessage(message);
            this.toast.setDuration(duration);
            this.toast.present();
            this.toast.onDidDismiss(function () {
                _this.toast = null;
            });
        }
    };
    ToastProvider.prototype.showError = function (code) {
        var _this = this;
        if (!this.toast) {
            var options = __WEBPACK_IMPORTED_MODULE_2__configs_toast_config__["a" /* ToastConfig */].options;
            this.toast = this.toastCtrl.create(options);
            this.toast.setMessage(this.translate.get(code));
            this.toast.setDuration(__WEBPACK_IMPORTED_MODULE_2__configs_toast_config__["a" /* ToastConfig */].duration);
            this.toast.present();
            this.toast.onDidDismiss(function () {
                _this.toast = null;
            });
        }
    };
    ToastProvider.prototype.hide = function () {
        if (this.toast) {
            this.toast.dismiss();
        }
    };
    return ToastProvider;
}());
ToastProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__translate__["a" /* TranslateProvider */]])
], ToastProvider);

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var AppConfig;
(function (AppConfig) {
    //App Configuration.
    //You can set your app configurations here.
    //For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
    AppConfig.config = {
        mode: 'ios' //Force app to have the iOS look and feel even when on other platforms.
    };
    //Replace app_id with your app_id on https://apps.ionic.io.
    //Make sure to choose the correct Ionic app.
    AppConfig.cloudConfig = {
        'core': {
            'app_id': 'a73347e0'
        },
        'push': {
            'sender_id': '249584835712'
        }
    };
    //Get your apiToken on https://apps.ionic.io, under Settings -> API Keys -> New Token -> Show token.
    //Make sure to choose the correct Ionic app.
    //This is needed to authorize this app to send push notifications using Ionic Push.
    AppConfig.apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmQzZDc0My01YjBhLTQ2OGItOTYwNi05NGJhNzM5N2MzZDQifQ.b9Ici5CP803c9t12lk5Mi7hJMGLV1qnQa5ngaiZFey8';
    //Create a security profile at https://apps.ionic.io, under Settings -> Certificates -> New Security Profile.
    //Edit the profile and upload your APN (iOS) and set your FCM Credentials (Android).
    //Please refer to the documentation on how to setup your APN and FCM Credentials.
    AppConfig.pushProfile = 'dev';
    //Default language to use.
    AppConfig.defaultLanguage = 'en';
})(AppConfig || (AppConfig = {}));
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthConfig; });
var AuthConfig;
(function (AuthConfig) {
    //Auth Configuration.
    //Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
    AuthConfig.firebaseConfig = {
        apiKey: "AIzaSyBUPmQS8s_RRlrmB61ApMJqwrzhP4Zt6-o",
        authDomain: "eventbuddy-de943.firebaseapp.com",
        databaseURL: "https://eventbuddy-de943.firebaseio.com",
        projectId: "eventbuddy-de943",
        storageBucket: "eventbuddy-de943.appspot.com",
        messagingSenderId: "144965795048"
    };
    //You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
    AuthConfig.googleWebClientId = '144965795048-cf9qgur4iujpmdh046tdkba2gd6u3h5n.apps.googleusercontent.com';
    //Set to true if you want to enable email verifications.
    AuthConfig.emailVerification = true;
})(AuthConfig || (AuthConfig = {}));
//# sourceMappingURL=auth-config.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastConfig; });
var ToastConfig;
(function (ToastConfig) {
    //Toast Configuration.
    //Please refer to the official Toast documentation here: https://ionicframework.com/docs/api/components/toast/ToastController/
    ToastConfig.options = {
        position: 'bottom' //Position of Toast, top, middle, or bottom.
    };
    ToastConfig.duration = 5000; //Duration (in milliseconds) of how long toast messages should show before they are hidden.
})(ToastConfig || (ToastConfig = {}));
//# sourceMappingURL=toast-config.js.map

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 251;

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-group/add-group.module": [
		1037,
		10
	],
	"../pages/complete-profile/complete-profile.module": [
		1039,
		1
	],
	"../pages/group-details/group-details.module": [
		1038,
		9
	],
	"../pages/group-search/group-search.module": [
		1040,
		8
	],
	"../pages/home/home.module": [
		1041,
		7
	],
	"../pages/intro/intro.module": [
		1042,
		6
	],
	"../pages/login/login.module": [
		1043,
		5
	],
	"../pages/send-push/send-push.module": [
		1044,
		0
	],
	"../pages/tabs/tabs.module": [
		1045,
		4
	],
	"../pages/update-profile/update-profile.module": [
		1046,
		3
	],
	"../pages/verification/verification.module": [
		1047,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 295;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatabaseProvider = (function () {
    function DatabaseProvider(database) {
        this.database = database;
        console.log("Initializing Database Provider");
    }
    DatabaseProvider.prototype.exists = function (query) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.database.object(query).take(1).subscribe(function (obj) {
                if (obj.$exists()) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    DatabaseProvider.prototype.getUserById = function (userId) {
        return this.database.object('users/' + userId);
    };
    DatabaseProvider.prototype.getGroupById = function (groupId) {
        return this.database.object('groups/' + groupId);
    };
    DatabaseProvider.prototype.getUsers = function () {
        return this.database.list('/users', {
            query: {
                orderByChild: 'firstName'
            }
        });
    };
    DatabaseProvider.prototype.getGroups = function () {
        return this.database.list('/groups', {
            query: {
                orderByChild: 'name'
            }
        });
    };
    DatabaseProvider.prototype.setUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.object('users/' + user.userId).set(user).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.updateGroupMember = function (groupId, member) {
        this.database.object('groups/' + groupId).update({
            'members': member
        });
    };
    DatabaseProvider.prototype.addGroup = function (group) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.list('/groups').push(group).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.addGroupActivity = function (activity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.list('/group-activity').push(activity).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.getGroupActivites = function (groupId) {
        return this.database.list('/group-activity', {
            query: {
                orderByChild: 'groupId',
                equalTo: groupId
            }
        });
    };
    DatabaseProvider.prototype.setPushToken = function (userId, token) {
        var _this = this;
        this.database.list('/users', {
            query: {
                orderByChild: 'pushToken',
                equalTo: token
            }
        }).take(1).subscribe(function (users) {
            if (users.length > 0) {
                _this.database.object('users/' + users[0].$key).update({
                    pushToken: ''
                });
            }
            _this.database.object('users/' + userId).update({
                pushToken: token
            });
        });
    };
    DatabaseProvider.prototype.removePushToken = function (userId) {
        this.database.object('users/' + userId).update({
            pushToken: ''
        });
    };
    return DatabaseProvider;
}());
DatabaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], DatabaseProvider);

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configs_loading_config__ = __webpack_require__(712);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoadingProvider = (function () {
    function LoadingProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        console.log("Initializing Loading Provider");
    }
    LoadingProvider.prototype.show = function () {
        if (!this.loading) {
            var options = __WEBPACK_IMPORTED_MODULE_2__configs_loading_config__["a" /* LoadingConfig */].options;
            this.loading = this.loadingCtrl.create(options);
            this.loading.present();
        }
    };
    LoadingProvider.prototype.hide = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    return LoadingProvider;
}());
LoadingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], LoadingProvider);

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnimationProvider = (function () {
    function AnimationProvider() {
        console.log("Initializing Animation Provider");
    }
    AnimationProvider.prototype.animate = function (element, animateClass) {
        element.className = '';
        setTimeout(function () {
            element.className = animateClass;
        }, 0);
    };
    return AnimationProvider;
}());
AnimationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AnimationProvider);

//# sourceMappingURL=animation.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(610);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_twitter_connect__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2__ = __webpack_require__(1033);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_cloud_angular__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_http_loader__ = __webpack_require__(1034);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__configs_auth_config__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__configs_app_config__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_component__ = __webpack_require__(1036);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















//Config


//Providers


function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_19__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_21__configs_app_config__["a" /* AppConfig */].config, {
                links: [
                    { loadChildren: '../pages/add-group/add-group.module#AddGroupPageModule', name: 'AddGroupPage', segment: 'add-group', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/group-details/group-details.module#GroupDetailsPageModule', name: 'GroupDetailsPage', segment: 'group-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/complete-profile/complete-profile.module#CompleteProfileModule', name: 'CompleteProfilePage', segment: 'complete-profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/group-search/group-search.module#GroupSearchPageModule', name: 'GroupSearchPage', segment: 'group-search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/send-push/send-push.module#SendPushPageModule', name: 'SendPushPage', segment: 'send-push', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/update-profile/update-profile.module#UpdateProfilePageModule', name: 'UpdateProfilePage', segment: 'update-profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/verification/verification.module#VerificationPageModule', name: 'VerificationPage', segment: 'verification', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_14_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_20__configs_auth_config__["a" /* AuthConfig */].firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_17__ionic_cloud_angular__["a" /* CloudModule */].forRoot(__WEBPACK_IMPORTED_MODULE_21__configs_app_config__["a" /* AppConfig */].cloudConfig),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]]
                }
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */]
        ],
        providers: [
            //Providers
            __WEBPACK_IMPORTED_MODULE_22__providers__["c" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["f" /* NetworkProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["g" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["i" /* ToastProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["b" /* AnimationProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["e" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["d" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["h" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["j" /* TranslateProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers__["k" /* UsersApi */],
            //Native
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_twitter_connect__["a" /* TwitterConnect */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertProvider = (function () {
    function AlertProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
        console.log("Initializing Alert Provider");
    }
    AlertProvider.prototype.showAlert = function (title, subTitle, button) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.alert = _this.alertCtrl.create({
                title: title,
                subTitle: subTitle,
                buttons: [{
                        text: button,
                        role: 'cancel',
                        handler: function () {
                            resolve();
                        }
                    }]
            });
            _this.alert.present();
        });
    };
    AlertProvider.prototype.showConfirm = function (title, subTitle, cancelButton, okButton) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.alert = _this.alertCtrl.create({
                title: title,
                subTitle: subTitle,
                buttons: [
                    {
                        text: cancelButton,
                        role: 'cancel',
                        handler: function () {
                            resolve(false);
                        },
                    },
                    {
                        text: okButton,
                        handler: function () {
                            resolve(true);
                        },
                    }
                ]
            });
            _this.alert.present();
        });
    };
    return AlertProvider;
}());
AlertProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], AlertProvider);

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__configs_auth_config__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toast__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AuthProvider = (function () {
    function AuthProvider(platform, angularfireAuth, facebook, googlePlus, twitterConnect, toast) {
        this.platform = platform;
        this.angularfireAuth = angularfireAuth;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.twitterConnect = twitterConnect;
        this.toast = toast;
        console.log("Initializing Auth Provider");
    }
    AuthProvider.prototype.destroy = function () {
        this.authSubscription.unsubscribe();
    };
    AuthProvider.prototype.getUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.authSubscription = _this.angularfireAuth.authState.subscribe(function (user) {
                resolve(user);
            });
        });
    };
    AuthProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.googlePlus.logout();
            _this.facebook.logout();
            _this.twitterConnect.logout();
            _this.angularfireAuth.auth.signOut().then(function () {
                _this.destroy();
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    AuthProvider.prototype.loginWithFacebook = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.facebook.login(['public_profile', 'user_friends', 'email']).then(function (res) {
                    __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"]().signInWithCredential(__WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken))
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        resolve(res);
                    })
                        .catch(function (error) { return console.log("Firebase failure: " + JSON.stringify(error)); });
                }).catch(function (err) { return console.error("Error: ", err); });
            }
            else {
                var error = "Cordova not found. Please deploy on actual device or simulator.";
                console.error("Google Login Error: " + error);
                reject(error);
            }
        });
    };
    AuthProvider.prototype.loginWithGoogle = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.googlePlus.login({
                    'webClientId': __WEBPACK_IMPORTED_MODULE_6__configs_auth_config__["a" /* AuthConfig */].googleWebClientId
                }).then(function (res) {
                    __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"]().signInWithCredential(__WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].GoogleAuthProvider.credential(res.idToken, res.accessToken))
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        resolve(res);
                    })
                        .catch(function (error) { return console.log("Firebase failure: " + JSON.stringify(error)); });
                }).catch(function (err) { return console.error("Error: ", err); });
            }
            else {
                var error = "Cordova not found. Please deploy on actual device or simulator.";
                console.error("Google Login Error: " + error);
                reject(error);
            }
        });
    };
    AuthProvider.prototype.loginWithTwitter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.twitterConnect.login().then(function (res) {
                    var credential = __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].TwitterAuthProvider.credential(res.token, res.secret);
                    _this.angularfireAuth.auth.signInWithCredential(credential).then(function (res) {
                        console.log("Twitter Login Success: " + JSON.stringify(res));
                        resolve(res);
                    }).catch(function (error) {
                        _this.toast.showError(error.code);
                        reject();
                    });
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    reject(error);
                });
            }
            else {
                var error = "Cordova not found. Please deploy on actual device or simulator.";
                console.error("Twitter Login Error: " + error);
                reject(error);
            }
        });
    };
    AuthProvider.prototype.loginWithEmail = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.angularfireAuth.auth.signInWithEmailAndPassword(email, password).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    AuthProvider.prototype.sendPasswordResetEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.angularfireAuth.auth.sendPasswordResetEmail(email).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    AuthProvider.prototype.createUserWithEmailAndPassword = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.angularfireAuth.auth.createUserWithEmailAndPassword(email, password).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    AuthProvider.prototype.getTwitterCredential = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.platform.is('cordova')) {
                _this.twitterConnect.login().then(function (res) {
                    var credential = __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].TwitterAuthProvider.credential(res.token, res.secret);
                    resolve(credential);
                });
            }
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__["a" /* TwitterConnect */],
        __WEBPACK_IMPORTED_MODULE_7__toast__["a" /* ToastProvider */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingConfig; });
var LoadingConfig;
(function (LoadingConfig) {
    //Loading Configuration.
    //Please refer to the official Loading documentation here: https://ionicframework.com/docs/api/components/loading/LoadingController/
    LoadingConfig.options = {
        spinner: 'circles'
    };
})(LoadingConfig || (LoadingConfig = {}));
//# sourceMappingURL=loading-config.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toast__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__translate__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NetworkProvider = (function () {
    function NetworkProvider(platform, network, toastCtrl, toast, translate) {
        this.platform = platform;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.toast = toast;
        this.translate = translate;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.init();
    }
    NetworkProvider.prototype.init = function () {
        var _this = this;
        console.log("Initializing Network Provider");
        this.platform.ready().then(function () {
            _this.subscription = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
            var self = _this;
            setTimeout(function () {
                self.networkOnlineSubscription = _this.network.onConnect().subscribe(function () {
                    self.connected = true;
                    self.toast.hide();
                    self.subscription.next(true);
                });
                self.networkOfflineSubscription = _this.network.onDisconnect().subscribe(function () {
                    self.connected = false;
                    self.toast.show(_this.translate.get('OFFLINE'));
                    self.subscription.next(false);
                });
            }, 1000);
            if (_this.network.type == 'none') {
                _this.connected = false;
            }
            else {
                _this.connected = true;
            }
        });
    };
    NetworkProvider.prototype.destroy = function () {
        this.networkOnlineSubscription.unsubscribe();
        this.networkOfflineSubscription.unsubscribe();
    };
    NetworkProvider.prototype.getNetworkType = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.platform.ready().then(function () {
                resolve(_this.network.type);
            });
        });
    };
    NetworkProvider.prototype.getIsConnected = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.platform.ready().then(function () {
                if (_this.connected) {
                    resolve(_this.connected);
                }
                else {
                    if (_this.network.type) {
                        if (_this.network.type == 'none') {
                            _this.toast.show(_this.translate.get('OFFLINE'));
                            resolve(false);
                        }
                        else {
                            resolve(true);
                        }
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    };
    NetworkProvider.prototype.online = function () {
        return this.connected;
    };
    return NetworkProvider;
}());
NetworkProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__toast__["a" /* ToastProvider */],
        __WEBPACK_IMPORTED_MODULE_4__translate__["a" /* TranslateProvider */]])
], NetworkProvider);

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_cloud_angular__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__database__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configs_app_config__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotificationProvider = (function () {
    function NotificationProvider(platform, push, database, http) {
        this.platform = platform;
        this.push = push;
        this.database = database;
        this.http = http;
    }
    NotificationProvider.prototype.init = function () {
        var _this = this;
        console.log("Initializing Notification Provider");
        if (this.platform.is('cordova')) {
            this.push.register().then(function (token) {
                console.log('Generated Token' + JSON.stringify(token));
                return _this.push.saveToken(token);
            }).then(function (token) {
                console.log('Token Saved', token);
                _this.database.setPushToken(__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid, token.token);
            }).catch(function (error) {
                console.log('Error Saving Token: ', error);
            });
        }
    };
    NotificationProvider.prototype.destroy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.database.removePushToken(__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                _this.push.unregister().then(function () {
                    resolve();
                }).catch(function (error) {
                    reject();
                });
            }
            else {
                reject();
            }
        });
    };
    NotificationProvider.prototype.sendPushNotification = function (deviceToken, title, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var postParams = {
                tokens: [deviceToken],
                profile: __WEBPACK_IMPORTED_MODULE_5__configs_app_config__["a" /* AppConfig */].pushProfile,
                notification: {
                    title: title,
                    message: message
                }
            };
            var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + __WEBPACK_IMPORTED_MODULE_5__configs_app_config__["a" /* AppConfig */].apiToken);
            var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post('https://api.ionic.io/push/notifications', postParams, options).subscribe(function (response) {
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    };
    return NotificationProvider;
}());
NotificationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_cloud_angular__["b" /* Push */],
        __WEBPACK_IMPORTED_MODULE_3__database__["a" /* DatabaseProvider */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], NotificationProvider);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TranslateProvider = (function () {
    function TranslateProvider() {
        console.log("Initializing Translate Provider");
    }
    TranslateProvider.prototype.setTranslations = function (translations) {
        this.translations = translations;
    };
    TranslateProvider.prototype.getTranslations = function () {
        return this.translations;
    };
    TranslateProvider.prototype.get = function (key) {
        return this.translations[key];
    };
    return TranslateProvider;
}());
TranslateProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], TranslateProvider);

//# sourceMappingURL=translate.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert__ = __webpack_require__(630);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__alert__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation__ = __webpack_require__(604);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__animation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(631);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__auth__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__database__ = __webpack_require__(342);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__database__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loading__ = __webpack_require__(353);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__loading__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network__ = __webpack_require__(713);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__network__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification__ = __webpack_require__(714);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__notification__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toast__ = __webpack_require__(113);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__toast__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__storage__ = __webpack_require__(1010);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__storage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__translate__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__translate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__api_users__ = __webpack_require__(1011);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__api_users__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__api_groups__ = __webpack_require__(1012);
/* unused harmony reexport GroupsApi */
//Add your providers here for easy indexing.












//# sourceMappingURL=index.js.map

/***/ })

},[605]);
//# sourceMappingURL=main.js.map