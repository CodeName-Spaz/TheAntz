import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider) {
    // this.art.getOrders().then((data:any) =>{
    //   this.retriveCustomerDetails = data;
    //   this.getData(this.retriveCustomerDetails[0].currentUserId,this.retriveCustomerDetails[0].uid,"")
    // })

    this.displayCurentMessages.length = 0;
    this.retriveCustomerDetails.length = 0;
    this.art.getOrders().then((data: any) => {
      this.retriveCustomerDetails = data;
      console.log(this.retriveCustomerDetails);
      console.log(this.displayCurentMessages);
      for (var x = 0; x < this.retriveCustomerDetails.length; x++) {
        this.getData(this.retriveCustomerDetails[x].currentUserId, this.retriveCustomerDetails[x].uid, "", x)
      }
    })


  }

  getData(id, user, message, x) {
    this.art.getMessages(id, user).then((data: any) => {
      console.log(data)
      if (data.status == true) {
        this.color = "light";
      }
      else {
        this.color = "dangers"
      }
      let obj = {
        tempName: this.retriveCustomerDetails[x].tempName,
        tempdownloadurl: this.retriveCustomerDetails[x].tempdownloadurl,
        name1: this.retriveCustomerDetails[x].name1,
        price: this.retriveCustomerDetails[x].price,
        email: this.retriveCustomerDetails[x].email,
        downloadurl: this.retriveCustomerDetails[x].downloadurl,
        message: data.message,
        time: data.time,
        messageRead: this.retriveCustomerDetails[x].messageRead,
        currentUserId: this.retriveCustomerDetails[x].currentUserId,
        uid: this.retriveCustomerDetails[x].uid,
        key: this.retriveCustomerDetails[x].key,
        color: this.color
      }
      this.displayCurentMessages.push(obj)
      console.log(this.displayCurentMessages)
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

  showDetails(downloadurl, tempName, tempdownloadurl, price, name1, email, message, key, currentUserId, uid) {
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
      currentUserId: currentUserId
    }

    this.navCtrl.push(ViewInforPage, { obj: obj });
  }


}