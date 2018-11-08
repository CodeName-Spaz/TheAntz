import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewInforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-infor',
  templateUrl: 'view-infor.html',
})
export class ViewInforPage {
  downloadurl;
  tempName;
  price;
  name1;
  email;
  message;
  tempdownloadurl;
  list = [];
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.navParams.get("obj");

    console.log(this.obj.tempName);
    console.log(this.obj.downloadurl);
    this.downloadurl = this.obj.downloadurl;
    this.email = this.obj.email;
    this.price = this.obj.price;
    this.name1 = this.obj.name1;
    this.tempdownloadurl = this.obj.tempdownloadurl
    this.tempName = this.obj.tempName;
    this.message = this.obj.message;
   this.list.length =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewInforPage');
  }

}
