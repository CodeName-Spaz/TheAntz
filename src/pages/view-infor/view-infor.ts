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
  // message;
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer, public art: StreetartzProvider) {
    this.obj = this.navParams.get("obj");

    console.log(this.obj.tempName);
    console.log(this.obj.downloadurl);
    this.downloadurl = this.obj.downloadurl;
    this.email = this.obj.email;
    this.price = this.obj.price;
    this.name1 = this.obj.name1;
    this.tempdownloadurl = this.obj.tempdownloadurl
    this.tempName = this.obj.tempName;
    this.currentUserId = this.obj.currentUserId;



    console.log(this.currentUserId);



    this.list.length = 0;

    let currentUser = firebase.auth().currentUser.uid
    console.log(currentUser);
    //  this.currentUserId =firebase.auth().currentUser.uid
    //  console.log(this.currentUserId);
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewInforPage');

  }
  repond() {
    let email = {
      to: this.obj.email,
      cc: '',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [

      ],
      subject: 'Cordova Icons',
      body: 'Greetings' + this.obj.tempName + 'i have received ur request',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  send() {
    this.art.BuyPicture(this.currentUser, this.currentUserId, this.message).then((data) => {
      console.log(data);
    })
  }
  getData() {
    this.art.retrieveChats(this.currentUser, this.currentUserId, this.message).then((data:any) => {
      this.arrMsg.length =0;
      this.arrMsg=[];
      this.arrMsg =data;
  })
  }

}
