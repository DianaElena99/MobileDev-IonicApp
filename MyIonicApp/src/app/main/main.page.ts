import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toast } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  data = []
  user = ""
  constructor(
    public toastController: ToastController, private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { 

    if(this.router.getCurrentNavigation().extras.state == undefined){
      this.router.navigate(['/home']);
    }
    else{
      this.user = this.router.getCurrentNavigation().extras.state.id;
      console.log("User:"+this.user);
      //let token = this.router.getCurrentNavigation().extras.state.token;
      
        this.http.get<any>('http://localhost:3000/items/' + this.user
      
      ).subscribe(data => { 
        console.log(data);
        this.data = data;
      });
    }
      
    
   
  };



  ngOnInit() {
    
  };

  edit(oItem){
    console.log(oItem);
    let navExtra : NavigationExtras = {
      state:{
        item:oItem,
        user:this.user
      }
    };
    console.log("Nav extra" , navExtra);
    this.router.navigate(['/edit' ], navExtra);
  }
}
