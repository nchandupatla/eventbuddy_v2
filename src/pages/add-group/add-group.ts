import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  DatabaseProvider, UsersApi } from '../../providers';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

/**
 * Generated class for the AddGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {
   group:any;
   private addGroupForm: FormGroup;
   private nameValidator: ValidatorFn = Validators.compose([
    Validators.required
  ]);
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private databaseProvider:DatabaseProvider,
    private usersApi:UsersApi ) {
     // this.databaseProvider.getGroups();
      this.addGroupForm = this.formBuilder.group({
        groupName: ['', this.nameValidator],
        groupDetails: ['', this.nameValidator],
        groupLocation: ['', this.nameValidator]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }

  add(){
   let currentDate=new Date().toString();
   this.group={
     'name':this.addGroupForm.value['groupName'],
     'details':this.addGroupForm.value['groupDetails'],
     'location':this.addGroupForm.value['groupLocation'],
     'userId':this.usersApi.getCurrentUser().userId,
     'date': currentDate,
     'members':[{'memberId':this.usersApi.getCurrentUser().userId,
                 'date':currentDate}]
  };
    this.databaseProvider.addGroup(this.group).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
