import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams,ViewController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ToastController } from 'ionic-angular';
import { CategoryPage } from '../category/category';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  obj = {} as obj;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(obj: obj) {

 
      this.art.register(this.obj);
      console.log(this.obj);
      this.presentToast();
      this.navCtrl.setRoot(CategoryPage); 
  }
      
  

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast() {

    const toast = this.toastCtrl.create({
      message: 'User registered successfully!',
      duration: 3000
    });
    toast.present();
  }

  presentToast1(){
    const toast = this.toastCtrl.create({
      message: 'Password doesnot Match!',
      duration: 3000
    });
    toast.present();
  }
}
