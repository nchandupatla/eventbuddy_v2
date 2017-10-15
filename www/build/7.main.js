webpackJsonp([7],{

/***/ 1034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupDetailsPageModule", function() { return GroupDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_details__ = __webpack_require__(1044);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupDetailsPageModule = (function () {
    function GroupDetailsPageModule() {
    }
    return GroupDetailsPageModule;
}());
GroupDetailsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__group_details__["a" /* GroupDetailsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_details__["a" /* GroupDetailsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__group_details__["a" /* GroupDetailsPage */]
        ]
    })
], GroupDetailsPageModule);

//# sourceMappingURL=group-details.module.js.map

/***/ }),

/***/ 1044:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the GroupDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var GroupDetailsPage = (function () {
    function GroupDetailsPage(navCtrl, navParams, database, usersApi, toastApi) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.usersApi = usersApi;
        this.toastApi = toastApi;
        var id = navParams.get('id');
        this.database.getGroupById(id).subscribe(function (groupDetails) {
            _this.groupDetails = groupDetails;
            var user = _this.usersApi.getUser(_this.groupDetails.userId);
            _this.groupDetails.owner = user.firstName + " " + user.lastName;
            _this.noOfMembers = _this.groupDetails.members.length;
            _this.isMember = false;
            var isMemberCheck = false;
            var currentUserId = _this.usersApi.getCurrentUser().userId;
            _this.groupDetails.members.forEach(function (member) {
                if (member.memberId == currentUserId) {
                    isMemberCheck = true;
                }
            });
            _this.isMember = isMemberCheck;
        });
    }
    GroupDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GroupDetailsPage');
    };
    GroupDetailsPage.prototype.joinGroup = function () {
        var member = { 'memberId': this.usersApi.getCurrentUser().userId };
        this.groupDetails.members.push(member);
        this.database.updateGroupMember(this.groupDetails.$key, this.groupDetails.members);
        this.toastApi.show("Successfully joined this group");
    };
    return GroupDetailsPage;
}());
GroupDetailsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-group-details',template:/*ion-inline-start:"C:\workspace\eventbuddy_v3\src\pages\group-details\group-details.html"*/'<!--\n\n  Generated template for the GroupDetailsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{groupDetails.name | uppercase}}</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n<ion-content padding>\n\n    <p>Owner:{{groupDetails.owner}}</p>\n\n    <p>Member(s):{{noOfMembers}} </p>\n\n    <p>Created On: {{groupDetails.date |  date :\'short\'}}</p>\n\n    <p>Details:{{groupDetails.details}}</p>\n\n  <button class="joinbtn" [hidden]="isMember" ion-button full (click)="joinGroup()">JOIN THIS GROUP</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\workspace\eventbuddy_v3\src\pages\group-details\group-details.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers__["k" /* UsersApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers__["k" /* UsersApi */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers__["d" /* ToastProvider */]) === "function" && _e || Object])
], GroupDetailsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=group-details.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map