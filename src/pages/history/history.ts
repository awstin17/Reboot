import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  historyPage: any = "historyPage"

  constructor(public chartProvider: ChartProvider) {}

}
