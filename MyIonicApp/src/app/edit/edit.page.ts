import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  data: {autor:'', titlu:'', status:'', data:'', rating:''};
  user = ""
  id = ""
  constructor(public toastController: ToastController, private http:HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.id = this.router.getCurrentNavigation().extras.state.item.id;
    this.user =this.router.getCurrentNavigation().extras.state.user;
    //console.log("Edit page : " + this.user);
    this.data = this.router.getCurrentNavigation().extras.state.item;
    console.log("Primit : " + this.user + " /" + this.id);
    this.http.get<any>('http://localhost:3000/items/' + this.user + "/" + this.id).subscribe(data => {
      this.data = data;
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 1300,
      color:"tertiary",
      position:"middle"
    });
    toast.present();
  }

  saveChanges(oItem){
    /*var mesg = {id:this.id, user:this.user, action:'UPDATE_ENTRY'}
    
    var ws = new WebSocket("ws://localhost:3002");

    ws.onopen = () =>{

      ws.send(JSON.stringify(mesg));
      ws.onmessage = function(msg){
        console.log(msg.data);
    }
    ws.close();*/
  }

  ngOnInit() {
  }

}
