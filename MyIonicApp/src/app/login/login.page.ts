import { Router , NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
 

   }

  ngOnInit() {

  }
  navExtra = {"token":"", "_id":""}
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

      var msg = {user:user, pass:passwd, action:'LOGIN'};
      var ws = new WebSocket("ws://localhost:3002");

      ws.onopen = () => {
        //ws.send(user + " " + passwd);
        ws.onmessage = function(msg){
          console.log(msg.data);
        }

        ws.send(JSON.stringify(msg));
        ws.close();
      }

      this.http.post<any>('http://localhost:3001/login',
              {
                "user":user,
                "pass":passwd
              }
              ).subscribe(data => {
              console.log("Data " + data);
              
              let info : NavigationExtras = {
                state:{
                  "id": data.username
                }
              }
              console.log(info);
              if (data.username!="")
                this.router.navigate(['/main'],info)
              
            })
      
    }
    else{
      this.router.navigate(['/'])
    }
  }

}
