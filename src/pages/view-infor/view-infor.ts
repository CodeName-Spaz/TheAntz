import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer) {
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
  repond(){
    let email = {
      to: this.obj.email,
      cc: '',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
       
      ],
      subject: 'Cordova Icons',
      body: 'Greetings'+ this.obj.tempName + 'i have received ur request',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
