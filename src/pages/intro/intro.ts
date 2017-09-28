import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AnimationProvider } from '../../providers/animation';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private animation: AnimationProvider,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let self = this;
      setTimeout(() => {
        self.animation.animate(document.getElementById('animate_1'), 'animateLaunchIn');
        self.animation.animate(document.getElementById('animate_2'), 'animateFadeInOut');
        self.animation.animate(document.getElementById('animate_3'), 'animateClockwise');
        self.animation.animate(document.getElementById('animate_4'), 'animateUpDown');
      }, 100);
    });
  }

}
