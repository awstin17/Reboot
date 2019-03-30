import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartProvider {

  appUserId: any = sessionStorage.getItem('userId')
  chartHistory: any = []; // Data for the history page
  mostRecentChart: any = [0, 0, 0, 0, 0, 0, 0, 0]; // Data for the chart on the dashboard page
  transitionPageChart: any = { // postChart.data is data for chart on transition page
    date: new Date(),
    data: [0, 0, 0, 0, 0, 0, 0, 0],
  } 

  requestUrl: string = 'https://reboot-ssf.herokuapp.com/api';

  constructor(public http: HttpClient) { }

  getChartHistory() {
    return this.http.get(this.requestUrl + '/appUsers/' + this.appUserId + '/charts')
  }

  saveChartToProfile() {
    return this.http.post(this.requestUrl + "/appUsers/" + this.appUserId + "/charts", this.transitionPageChart)
  }
}
