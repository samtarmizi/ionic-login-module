import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data:any={};
  

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  async register() {
    await this.authService.register( this.data.name, this.data.email, this.data.password, this.data.c_password)
    .then(async data => {
        // this.navCtrl.navigateRoot('dashboard');
        // console.log('data xyz',await data);
        // alert(JSON.stringify(data));
        this.alertService.presentToast("Registered" );
        //this.alertService.presentToast(data);

        // await this.authService.login(form.value.email, form.value.password).subscribe(
        //   async data => {
        //     await this.dismissRegister();
        //     await this.navCtrl.navigateRoot('/dashboard');
        //   },
        //   async error => {
        //     await console.log(error);
        //   },
        //   // async () => {
            
        //   // }
        // );
        // await this.alertService.presentToast(data['message']);
      },err=>{
        //console.log("ERRor",err);
        //alert(JSON.stringify(err.error.data.email));
        //err.error.data = this.data;
        //this.data = err.error.data;
        if(err.error.data.email == null){
          err.error.data.email = "";
        }
        else{
          err.error.data.email = "Please check your email credentials. We believe the credentials has been taken."
        }

        if(err.error.data.c_password == null){
          err.error.data.c_password = "";
        }
        else{
          err.error.data.c_password = "Please check your confirmation password. We believe the password has slightly different for our confirmation.";
        }

        this.alertService.presentToast(
                    err.error.message + '<br/>The error:<br/><br/>' +
                    err.error.data.email + '<br/><br/>' +
                    err.error.data.c_password);
        //this.alertService.presentToast(err.error.data.email);
        //this.alertService.presentToast(err.error.data.c_password);
      })
      // error => {
      //   console.log("errorx",error);
      // },
      // () => {
        
      // }
  }
}