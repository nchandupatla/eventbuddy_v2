import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteProfilePage } from './complete-profile';

@NgModule({
  declarations: [
    CompleteProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteProfilePage),
    TranslateModule.forChild()
  ],
  exports: [
    CompleteProfilePage
  ]
})
export class CompleteProfileModule { }
