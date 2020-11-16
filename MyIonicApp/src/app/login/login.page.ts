import { Router , NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public toastController: ToastController,
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


    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Failed Login',
        duration: 1300,
        color:"danger",
        position:"middle"
      });
      toast.present();
    }

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

      this.http.post<any>('http://localhost:3000/login',
              {
                "user":user,
                "pass":passwd
              }).subscribe(
                data => {
                  console.log(data.status)
                  console.log("DATA USER : " + data.user);

                  if (data.user!=""){
                    let info : NavigationExtras = {
                      state:{
                        "id": data.user,
                        "token": data.token
                      }
                    }
                
                    this.router.navigate(['/main'],info)
                    
                  } 
                              
                }, 
                error =>{
                  this.presentToast()
                })
      
    }
    else{
      this.presentToast()
    }
  }

}
