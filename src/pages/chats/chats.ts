import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  username;
  downloadurl;
  keys2;
  downloadurl1;
  email;
  name;
  name1;
  description;
  price;
  location;
  numlikes;
  numComments;
  arr = [];
  tempName;
  uid:any;
  tempdownloadurl;
  tempemail;
  retriveCustomerDetails = [];
  // obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.obj = this.navParams.get("obj");
    // console.log(this.obj)



    // console.log(this.obj.email);
    // console.log(this.obj.uid);
    // this.username = this.obj.username;
    // this.downloadurl = this.obj.pic;
    // this.keys2 = this.obj.key;
    // this.downloadurl1 = this.obj.url
    // this.numComments = this.obj.comments;
    // this.email = this.obj.email;
    // this.name = this.obj.name;
    // this.description = this.obj.description;
    // this.location = this.obj.location;
    // this.price = this.obj.price;
    // this.numlikes = this.obj.likes;
    // this.name1 = this.obj.name1;
    // this.uid = this.obj.uid





    firebase.database().ref('Orders/').on("value",(data:any)=>{
      let infor = data.val();
      this.retriveCustomerDetails.push(infor);
      console.log(this.retriveCustomerDetails);
    })
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

}
