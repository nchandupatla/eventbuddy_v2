import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateProfilePage } from './update-profile';

@NgModule({
  declarations: [
    UpdateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProfilePage),
    TranslateModule.forChild()
  ],
  exports: [
    UpdateProfilePage
  ]
})
export class UpdateProfilePageModule { }
