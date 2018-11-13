import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  message = "Greetings, I would like to purchase this artwork from you. Please reach me on my email "
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider,public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ngOnInit() {

  }
  




}
