import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public chartProvider: ChartProvider) { }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

}
