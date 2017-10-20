import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers";

/**
 * Generated class for the GroupSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-search',
  templateUrl: 'group-search.html',
})
export class GroupSearchPage {

  items: any;
  searchItems: any;

  constructor(
    public navCtrl: NavController, 
    private database: DatabaseProvider) {
    this.database.getGroups().subscribe((groups : any) => {
     this.items = groups;
     this.searchItems = groups;
   }

   )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupSearchPage');
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.items = this.searchItems;
    }
  }

}
