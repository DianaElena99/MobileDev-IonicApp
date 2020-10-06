import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  postData = {
    username: '',
    password: ''
    };

  validateInputs() {
      let username = this.postData.username.trim();
      let password = this.postData.password.trim();
      return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
      );
  }

  loginAction(){
    var user, passwd;
    if(this.validateInputs()){
      user = this.postData.username.trim();
      passwd = this.postData.password.trim();
      console.log("Mere loginu : " + user + " " + passwd);
      this.router.navigate(['/main'])
    }
    else{
      this.router.navigate(['/'])
    }
  }

}
