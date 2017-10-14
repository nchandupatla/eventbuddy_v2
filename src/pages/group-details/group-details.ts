import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers';

/**
 * Generated class for the GroupDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  groupDetails:any;
  name:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: DatabaseProvider) {
    let id = navParams.get('id');
    this.database.getGroupById(id).subscribe((groupDetails: any) => {
      this.groupDetails=groupDetails;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailsPage');
  }

}
