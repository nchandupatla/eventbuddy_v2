import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { DatabaseProvider, UsersApi, ToastProvider } from '../../providers';

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
  isMember:boolean;
  noOfMembers:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: DatabaseProvider,
    private usersApi:UsersApi,
    private toastApi:ToastProvider,
    public alertCtrl: AlertController) {
    let id = navParams.get('id');
    this.database.getGroupById(id).subscribe((groupDetails: any) => {
      this.groupDetails=groupDetails;
      let user=this.usersApi.getUser(this.groupDetails.userId);
      this.groupDetails.owner=user.firstName+" "+user.lastName;
      this.noOfMembers=this.groupDetails.members.length;


      this.isMember=false;
      let isMemberCheck=false;
      let currentUserId=this.usersApi.getCurrentUser().userId;
      this.groupDetails.members.forEach(function(member){
        if(member.memberId==currentUserId){
          isMemberCheck=true;
        }
      })
      this.isMember=isMemberCheck;
    });

    this.database.getGroupActivites(id).subscribe((activities: any) => {
      console.log('activitiy '+JSON.stringify(activities));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailsPage');
  }

  joinGroup(){
    let member={'memberId':this.usersApi.getCurrentUser().userId};
    this.groupDetails.members.push(member);
    this.database.updateGroupMember(this.groupDetails.$key,this.groupDetails.members);
    this.toastApi.show("Successfully joined this group");
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New Activity',
      inputs: [
        {
          name: 'activity',
          placeholder: 'Activity'
        },
        {
          name: 'details',
          placeholder: 'Details'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            data.groupId=this.navParams.get('id');
            data.createdAt=new Date().toDateString();
            this.database.addGroupActivity(data);
          }
        }
      ]
    });
    prompt.present();
  }


}
