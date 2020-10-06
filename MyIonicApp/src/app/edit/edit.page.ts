import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  data: {autor:'', titlu:'', status:''};

  constructor(public toastController: ToastController, private route: ActivatedRoute, private router: Router) {
    console.log("Edit page : " + this.router.getCurrentNavigation().extras.state.item.titlu);
    this.data = this.router.getCurrentNavigation().extras.state.item;
    console.log("Primit : " + this.data);
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
    this.presentToast();
  }

  ngOnInit() {
  }

}
