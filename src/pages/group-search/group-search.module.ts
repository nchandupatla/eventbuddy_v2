import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupSearchPage } from './group-search';

@NgModule({
  declarations: [
    GroupSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupSearchPage),
  ],
  exports: [
    GroupSearchPage
  ]
})
export class GroupSearchPageModule {}
