import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import firebase from 'firebase';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
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
  currentUserId;
  arrMsg = [];
  currentUser;
  uid: any;
  primaryKey;
  foreignKey;
  // message;
  condition="";
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer, public art: StreetartzProvider) {
    this.obj = this.navParams.get("obj");

    // console.log(this.obj.tempName);
    // console.log(this.obj.downloadurl);
    this.downloadurl = this.obj.downloadurl;
    this.email = this.obj.email;
    this.price = this.obj.price;
    this.name1 = this.obj.name1;
    this.tempdownloadurl = this.obj.tempdownloadurl
    this.tempName = this.obj.tempName;
    this.currentUserId = this.obj.currentUserId;
    this.uid = this.obj.uid;
    this.currentUser = this.obj.currentUser


    console.log(this.currentUserId);
    console.log(this.obj.uid);
    // console.log(this.currentUser);

    // this.currentUser = firebase.auth().currentUser.uid
    // console.log(this.obj.currentUser)
    // alert("art currentuser" + this.currentUserId+ " client userid " + currentUser);

    // if(this.currentUserId == currentUser){



    // }
    this.list.length = 0;


    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewInforPage');

  }

  send(currentUserId) {
    this.art.BuyPicture(this.currentUserId,this.obj.uid,this.message).then((data) => {
      console.log(data);
    })
  }

  showDetails(currentUserId) {
    let obj = {
      currentUserId: currentUserId
    }
    this.navCtrl.push(ViewInforPage, { obj: obj });
  }
  getData() {
    this.art.retrieveChats(this.obj.uid,this.currentUserId,this.message).then((data: any) => {
      this.arrMsg = data;
      console.log(this.arrMsg);
    })

  }



}
