import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupPage } from './add-group';

@NgModule({
  declarations: [
    AddGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupPage),
  ],
  exports: [
    AddGroupPage
  ]
})
export class AddGroupPageModule {}
