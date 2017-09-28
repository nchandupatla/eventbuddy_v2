import { NgModule } from '@angular/core';
import { UsersPipe } from './users';

@NgModule({
  declarations: [
    UsersPipe,
  ],
  imports: [

  ],
  exports: [
    UsersPipe,
  ]
})
export class PipesModule { }
