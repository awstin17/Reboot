import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ToastController, PopoverController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { PopupPage } from '../popup/popup';
import { UserProvider } from '../../providers/user/user'
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginResponse: any;
  private loginCreds: any;

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public _userService: UserProvider,
    private formBuilder: FormBuilder,
    private chartProvider: ChartProvider,
    private toastCtrl: ToastController) {
    this.loginCreds = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.presentPopup();
  }

  presentPopup() {
    const popup = this.popoverCtrl.create(PopupPage);
    popup.present();
  }

  /* Right now the flow of login in the function below is as follows:
     1) User is logged in and their userId stored in session storage
     2) The user's historical chart data is retrieved
     3) Then the user is navigated to the dashboard page
  */

  login() {
    this._userService.login(this.loginCreds.value)
      .subscribe(
        (res) => {
          this.loginResponse = res;
          this.storeUserSessionData();
          this.getChartData()
        },
        (err) => {
          this.presentLoginErrorMessage();
        }
      )
  }

  storeUserSessionData() {
    sessionStorage.setItem('userId', this.loginResponse.userId)
    sessionStorage.setItem('token', this.loginResponse.id);
  }

  presentLoginErrorMessage() {
    let toast = this.toastCtrl.create({
      message: "Invalid credentials",
      duration: 2500,
      position: 'middle'
    })

    toast.present()
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  getChartData() {
    this.chartProvider.getChartHistory()
      .subscribe((res) => {
        this.chartProvider.chartHistory = res;
        if (this.chartProvider.chartHistory[0]) {
          this.chartProvider.chartHistory.reverse(); // Reversing orders array from most recent to least recent chart data
          this.chartProvider.mostRecentChart = this.chartProvider.chartHistory[0].data;
          for (let i = 0; i < this.chartProvider.chartHistory.length; i++) {
            this.chartProvider.chartHistory[i].date = new Date(this.chartProvider.chartHistory[i].date).toDateString();
          }
        }
        this.goToDashboard();
      },
        (err) => {return Promise.resolve(1)}

      );
  }

  goToDashboard() {
    let toast = this.toastCtrl.create({
      message: "Login successful!",
      duration: 2500,
      position: 'middle',
      cssClass: 'toasts'
    });

    toast.present();
    this.navCtrl.setRoot(DashboardPage)
  }
}
