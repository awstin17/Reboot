import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { UserProvider } from '../../providers/user/user';
import { WizardPage } from '../wizard/wizard'
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  private validate: FormGroup
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public _user: UserProvider) {
    
    this.validate = this.formBuilder.group({
      first: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pass: this.formBuilder.group({
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        passwordCheck: ['', Validators.required]
      }, {validator: PasswordValidator})
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submitReg() {
    this.submitAttempt = true
    console.log('submitReg() runs', this.registerUser)
    this._user.sendReg(this.registerUser)
      .subscribe( (data: any) => {
        console.log('data from submitReg()', data)
      },
      err => {
      console.error('err from register:', err)
      //this.presentToast()
      },
      () => {
      this.navCtrl.setRoot(WizardPage, {registered: this.registerUser})
      }
      ) 
  }

  goLogin() {
    this.navCtrl.setRoot(LoginPage)
  }

}

