import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  requestUrl: string = "https://reboot-ssf.herokuapp.com/api"

  constructor(public http: HttpClient) { }

  sendReg(user) {
    return this.http.post(this.requestUrl + '/appUsers', user)
  }

  //update data from wizard page and patch user model
  updateUserModel(data: any, id) {
    return this.http.patch(this.requestUrl + '/appUsers/' + id , data)
  }

  login(creds) {
    return this.http.post(this.requestUrl + '/appUsers/login', creds);
  }
  
}
