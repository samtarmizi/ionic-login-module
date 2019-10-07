import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data:any={};
  
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async login() {
    await this.authService.login( this.data.email, this.data.password)
    .then(async data => {
        // this.navCtrl.navigateRoot('dashboard');
        // console.log('data xyz',await data);
        // alert(JSON.stringify(data));
        this.alertService.presentToast("Login" );
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
        //alert(JSON.stringify(err));
        //err.error.data = this.data;
        //this.data = err.error.data;
        // if(err.error.data.email == null){
        //   err.error.data.email = "Email OK";
        // }
        // if(err.error.data.c_password == null){
        //   err.error.data.c_password = "Confirm Password OK";
        // }

        this.alertService.presentToast(
                    err.error.error + '<br/>' +
                    err.error.error_description + '<br/>' +
                    err.error.message 
                      );
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