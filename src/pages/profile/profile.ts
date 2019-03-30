import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public chartProvider: ChartProvider) { }

  onLogout() {
    window.sessionStorage.clear();
    this.clearChartData();
    this.navCtrl.setRoot(LoginPage)
  }

  clearChartData() {
    this.chartProvider.chartHistory = []; // Data for the history page
    this.chartProvider.mostRecentChart = [0, 0, 0, 0, 0, 0, 0, 0]; // Data for the chart on the dashboard page
    this.chartProvider.transitionPageChart = { // postChart.data is data for chart on transition page
      date: new Date(),
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    }
  }

}
