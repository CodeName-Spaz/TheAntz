import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';


import { IonicImageViewerModule } from 'ionic-img-viewer';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
//viewpage Ts\\

export class ViewPage {
  comment: any;
  data: any;
  name;
  downloadurl;
  description;
  keys2;
  obj = this.navParams.get("obj"); 
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider) {
    this.obj = this.navParams.get("obj");
    console.log("this is my index");
    console.log(this.obj);

    this.name = this.obj.name;
    this.downloadurl = this.obj.pic;
    this.keys2 = this.obj.key;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    console.log(this.obj);


  }
  GoBackToCategory() {
    this.navCtrl.pop();
  }
  // sendComment(){
  //   this.art.comments(this.data.key,this.comment).then((data) => {
  //     console.log(data);
  //   })
  // }


}