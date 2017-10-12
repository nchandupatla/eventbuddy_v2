webpackJsonp([7],{

/***/ 1034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddGroupPageModule", function() { return AddGroupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_group__ = __webpack_require__(1043);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddGroupPageModule = (function () {
    function AddGroupPageModule() {
    }
    return AddGroupPageModule;
}());
AddGroupPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_group__["a" /* AddGroupPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_group__["a" /* AddGroupPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__add_group__["a" /* AddGroupPage */]
        ]
    })
], AddGroupPageModule);

//# sourceMappingURL=add-group.module.js.map

/***/ }),

/***/ 1043:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(33);
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
 * Generated class for the AddGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddGroupPage = (function () {
    function AddGroupPage(navCtrl, navParams, formBuilder, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.databaseProvider = databaseProvider;
        this.nameValidator = __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required
        ]);
        // this.databaseProvider.getGroups();
        this.addGroupForm = this.formBuilder.group({
            groupName: ['', this.nameValidator]
        });
    }
    AddGroupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddGroupPage');
    };
    AddGroupPage.prototype.add = function () {
        var _this = this;
        this.group = { 'name': this.addGroupForm.value['groupName'] };
        this.databaseProvider.addGroup(this.group).then(function () {
            _this.navCtrl.setRoot('HomePage');
        });
    };
    return AddGroupPage;
}());
AddGroupPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-add-group',template:/*ion-inline-start:"C:\workspace\eventbuddy_v2\src\pages\add-group\add-group.html"*/'<!--\n  Generated template for the AddGroupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Group</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="addGroupForm">\n    <ion-list>\n\n      <ion-item>\n        <ion-label>Name</ion-label>\n        <ion-input type="text" formControlName="groupName" placeholder="Group Name"></ion-input>\n      </ion-item>\n      <p *ngIf="addGroupForm.controls.groupName.hasError(\'required\') && addGroupForm.controls.groupName.touched">\n        Group name is required\n      </p>\n      <p *ngIf="!addGroupForm.controls.groupName.valid && !addGroupForm.controls.groupName.hasError(\'required\') && addGroupForm.controls.groupName.touched">\n        Group name is required\n      </p>\n  \n\n    </ion-list>\n\n    <div padding>\n      <button ion-button icon-left color="skyblue" (click)="add()" [disabled]="!addGroupForm.valid">\n               Add Group\n    </button>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\workspace\eventbuddy_v2\src\pages\add-group\add-group.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* DatabaseProvider */]])
], AddGroupPage);

//# sourceMappingURL=add-group.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map