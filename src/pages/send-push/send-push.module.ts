import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SendPushPage } from './send-push';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    SendPushPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPushPage),
    TranslateModule.forChild(),
    PipesModule
  ],
  exports: [
    SendPushPage
  ]
})
export class SendPushPageModule { }
