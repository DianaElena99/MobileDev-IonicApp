import { Router,NavigationExtras } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  /* 0 - in progress / 1 - done*/
  data = [{titlu:'Cum se face o teza de licenta', autor:'Umberto Eco', status:0}, 
          {titlu:'Exalare', autor:'Ted Chiang', status:1} ,
          {titlu:'Omul in cautarea sensului vietii', autor:'Viktor Frankl', status:0} 
          ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  edit(oItem){
    console.log(oItem);
    let navExtra : NavigationExtras = {
      state:{
        item:oItem
      }
    };
    console.log("Nav extra" , navExtra);
    this.router.navigate(['/edit'], navExtra);
  }
}
