import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  DatabaseProvider } from '../../providers';
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
    private databaseProvider:DatabaseProvider ) {
     // this.databaseProvider.getGroups();
      this.addGroupForm = this.formBuilder.group({
        groupName: ['', this.nameValidator]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }

  add(){
   this.group={'name':this.addGroupForm.value['groupName']};
    this.databaseProvider.addGroup(this.group).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}