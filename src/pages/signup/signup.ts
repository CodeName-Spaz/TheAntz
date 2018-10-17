import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ToastController } from 'ionic-angular';
import { CategoryPage } from '../category/category';

import { UploadedPage } from '../uploaded/uploaded';

import { LoadingController } from 'ionic-angular';
import { EulaPage } from '../eula/eula';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('input') myInput: ElementRef

  obj = {} as obj;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    if(this.obj.email ==null || this.obj.email == undefined)
    {
      const alert = this.alertCtrl.create({
        subTitle: 'Please enter your Email.',
        buttons: ['OK']
      });
      alert.present();
  }
  else if (this.obj.name ==null || this.obj.name == undefined){
    const alert = this.alertCtrl.create({
      subTitle: 'Please enter your Name.',
      buttons: ['OK']
    });
    alert.present();

  }
  else if (this.obj.password ==null || this.obj.password == undefined){
    const alert = this.alertCtrl.create({
      subTitle: 'Please enter your password.',
      buttons: ['OK']
    });
    alert.present();

  
  }

  else if (this.obj.password.length < 6 || this.obj.password == undefined){
    const alert = this.alertCtrl.create({
      subTitle: 'Please enter minimum of 6 characters.',
      buttons: ['OK']
    });
    alert.present();

  
  }
  else{
    this.art.register(this.obj).then(() => {
      this.presentLoading();
      this.navCtrl.setRoot(CategoryPage);
      this.presentLoading1();
    }, (error) => {
      console.log(error.message);
    })
  }
  }
  dismiss() {
    this.navCtrl.setRoot(LoginPage);
  }
  presentLoading() {
    const toast = this.toastCtrl.create({
      message: this.obj.email + 'You have succesfflly registered',
      duration: 2000
    });
    toast.present();
  }
  presentLoading1() {
    const loader = this.loadingCtrl.create({
      content: "loading....",
      duration: 5000
    });
    loader.present();
  }
  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
  }
  else {
          const toast = this.toastCtrl.create({
        message: event.keyCode - 48 + ' is not allowed as a name',
        duration: 2000
      });
      toast.present();
       return false;
  }  
}
}
