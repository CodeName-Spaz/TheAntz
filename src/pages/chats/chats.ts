import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { OrderModalPage } from '../order-modal/order-modal';
import { ViewInforPage } from '../view-infor/view-infor';
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
  uid: any;
  tempdownloadurl;
  tempemail;
  key;
  list = [];
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



    var currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);


    firebase.database().ref('Orders/' + currentUser).on("value", (data: any) => {
      this.retriveCustomerDetails.length =0;
      let infor = data.val();
      let keys = Object.keys(infor);
      for (var i = 0; i < keys.length; i++) {
        firebase.database().ref('Orders/' + currentUser).on("value", (data2: any) => {
      
          let inforKey = data2.val();
          let keys2 = Object.keys(inforKey);
          // for(var i =0; i< keys.length;i++){
          var k = keys2[i];
          let obj = {
            tempName: inforKey[k].tempName,
            tempdownloadurl: inforKey[k].tempdownloadurl,
            name1: inforKey[k].name1,
            price: infor[k].price,
            email: infor[k].email,
            downloadurl: inforKey[k].downloadurl,
            message: inforKey[k].message
          }
          this.retriveCustomerDetails.push(obj)
          console.log(this.retriveCustomerDetails);
          // }
        })
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  scroll(event) {
    console.log(event);

  }
  showDetails(downloadurl, tempName, tempdownloadurl, price, name1, email, message) {
    let obj = {
      downloadurl: downloadurl,
      tempName: tempName,
      tempdownloadurl: tempdownloadurl,
      price: price,
      name1: name1,
      email: email,
      message: message
    }

    this.navCtrl.push(ViewInforPage, { obj: obj });


  }
}
