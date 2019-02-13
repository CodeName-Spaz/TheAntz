import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { OrderModalPage } from '../order-modal/order-modal';
import { ViewInforPage } from '../view-infor/view-infor';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
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
  private buttonColor: string = "primary"
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
  xxx;
  currentUserId;
  artId;
  tempUid;
  displayCurentMessages = []
  arrMsg = new Array();
  color;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider) {

  }

  ionViewDidEnter() {
    this.displayCurentMessages.length = 0;
    this.getData();
  }

  getData() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait....",
      duration: 4000000
    });
    loading.present();
    this.art.getSentMessages().then(() => {
      this.art.getDirectMessgs().then((data: any) => {
        console.log(data);
        setTimeout(() => {
          if (data != '') {
            //this.art.step2(data)
            this.art.getAllConvo().then((data2: any) => {
              this.displayCurentMessages = data2;
              loading.dismiss();
            })
          }
          else {
            this.art.getAllConvo().then((data2: any) => {
              this.displayCurentMessages = data2;
              loading.dismiss();
            })
          }
        }, 1400);
      }, Error => {
        console.log(Error);
      })
    })

  }

  // ionViewDidEnter() {
  //   this.displayCurentMessages.length = 0;
  //   this.retriveCustomerDetails.length = 0;
  //   this.art.getOrders().then((data:any) =>{
  //     this.retriveCustomerDetails = data;
  //     console.log(this.retriveCustomerDetails);
  //     for (var x = 0; x < this.retriveCustomerDetails.length; x++){
  //       this.getData(this.retriveCustomerDetails[x].currentUserId,this.retriveCustomerDetails[x].uid,"", x)
  //     }
  //   })
  // }

  scroll(event) {
    // console.log(event);

  }

  showDetails(downloadurl, tempName, tempdownloadurl, price, name1, email, message, key, currentUserId, uid, path, pic) {
    let obj = {
      downloadurl: downloadurl,
      tempName: tempName,
      tempdownloadurl: tempdownloadurl,
      price: price,
      name1: name1,
      email: email,
      message: message,
      key: key,
      uid: uid,
      currentUserId: currentUserId,
      path: path,
      pic: pic
    }
    console.log(obj);

    this.navCtrl.push(ViewInforPage, { obj: obj });
  }


}